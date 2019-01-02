import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as responseTime from 'response-time';

import { IConfig, IJSONError, IJSONResponse, INext, IRequest, IResponse } from './common/interfaces';

import { getController } from './decorators';

export abstract class ExpressApp {

  public app : express.Application;
  public server : http.Server;

  constructor (private config : IConfig, private mainPath : string = '', private logError? : Function) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.init();
  }

  public abstract configure () : void;

  public defaultConfig () : void {
    this.app
      .disable('x-powered-by')
      .disable('views')
      .disable('view cache')
      .disable('view engine')
      .use(cors())
      .use(morgan('dev'))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
      .use(responseTime());
  }

  public run (port : number) : http.Server {
    const server = this.server.listen(port);
    server.timeout = 1000 * 60 * 3;

    return this.server;
  };

  public jsonResponse ({ data, error, code, status } : any, req : IRequest = {} as IRequest) : any {
    return (res : IResponse) : any => {
      if (status) res.status(status);

      let _docs = req.docs || undefined;
      let _links = req.links || undefined;

      let positive : IJSONResponse = { _docs, _links, data };
      let negative : IJSONError = { _docs, _links, error: { status, code, data: error } };

      return error ? res.json(negative) : res.json(positive);
    };
  }

  private init () : void {
    this.configure();
    this.setupMiddlewares(this.config.middlewares);
    this.setupMiddlewares(this.config.guards);
    this.setupControllers(this.config.controllers);
    this.setupMiddlewares(this.config.handlers);
  }

  private setupMiddlewares (middlewares : Function[]) : void {
    middlewares.forEach(middleware => this.app.use(<any>middleware));
  }

  private setupControllers (controllers : object[]) : void {
    for (const item of controllers) {
      let { target, basePath, guards, params, routes } = getController(item);
      let router = express.Router({ mergeParams: true });

      if (params.length)
        for (const param of params) {
          router.param(param.name, param.handler);
          this.app.param(param.name, param.handler);
        }

      for (const { method, path, middlewares, handlerKey } of routes)
        router[method](path, [...middlewares], this.catchHandler(target[handlerKey].bind(target)));

      let method : string = basePath === '*' ? 'get' : 'use';

      this.app[method](this.mainPath + basePath, [...guards], router);
    }
  }

  private catchHandler (fn : Function) : Function {
    return async (req : IRequest, res : IResponse, next : INext) : Promise<void> => {
      try {
        let data = await fn(req, res, next);
        if (!res.headersSent) this.jsonResponse({ data }, req)(res);
      }
      catch (e) {
        if (this.logError) this.logError(e.source || e);
        this.jsonResponse({ error: e.data || e.message, status: e.status }, req)(res);
      }
    };
  }

}