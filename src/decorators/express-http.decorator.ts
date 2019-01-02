import 'reflect-metadata';
import { RequestHandler } from 'express';

import { ERouteMethods } from '../common/enums';
import {
  IHttpDecoratorController,
  IHttpDecoratorLink,
  IHttpDecoratorMiddleware,
  IHttpDecoratorRoute,
  IRequest
} from '../common/interfaces';

const __CONTROLLER__ = 'http:controller';
const __ROUTES__ = 'http:route';

export function trimPath (str : string) : string {
  return str[str.length - 1] == '/' ? str.slice(0, str.length - 1) : str;
}

export function getController (controllerClass) : IHttpDecoratorController {
  const instance = new controllerClass();
  return Reflect.getMetadata(__CONTROLLER__, instance.constructor) || {};
}

export function route (method : ERouteMethods, path : string, middlewares : RequestHandler[] = []) {
  return (target, key) : void => {
    let routes : IHttpDecoratorRoute[] = Reflect.getMetadata(__ROUTES__, target.constructor) || [];

    routes.push(<IHttpDecoratorRoute>{
      method,
      path: trimPath(path),
      middlewares,
      handlerKey: key
    });

    Reflect.defineMetadata(__ROUTES__, routes, target.constructor);
  };
}

export function controller (basePath : string, middlewares : IHttpDecoratorMiddleware = {}) {
  return (target) : void => {
    let routes : IHttpDecoratorRoute[] = Reflect.getMetadata(__ROUTES__, target.prototype.constructor) || [];

    let controller : IHttpDecoratorController = {
      target: new target(),
      basePath: trimPath(basePath),
      params: middlewares.params || [],
      guards: middlewares.guards || [],
      routes
    };

    Reflect.defineMetadata(__CONTROLLER__, controller, target.prototype.constructor);
  };
}

export function request (name : string, value : any) {
  return (target, propertyKey, descriptor : TypedPropertyDescriptor<Function>) : any => {
    let method = descriptor.value;

    descriptor.value = async (req : IRequest, ...args) => {
      req[name] = value;
      return method.apply(this, [req, ...args]);
    };

    return descriptor;
  };
}

export function Controller (basePath : string, middlewares : IHttpDecoratorMiddleware = {}) {
  return controller(basePath, middlewares);
}

export function Links (array : IHttpDecoratorLink[]) {
  return request('links', array);
}

export function Docs (url : string) {
  return request('docs', url);
}

export function All (path : string, middlewares? : RequestHandler[]) : Function {
  return route(ERouteMethods.all, path, middlewares);
}

export function Get (path : string, middlewares? : RequestHandler[]) : Function {
  return route(ERouteMethods.get, path, middlewares);
}

export function Post (path : string, middlewares? : RequestHandler[]) : Function {
  return route(ERouteMethods.post, path, middlewares);
}

export function Patch (path : string, middlewares? : RequestHandler[]) : Function {
  return route(ERouteMethods.patch, path, middlewares);
}

export function Put (path : string, middlewares? : RequestHandler[]) : Function {
  return route(ERouteMethods.put, path, middlewares);
}

export function Delete (path : string, middlewares? : RequestHandler[]) : Function {
  return route(ERouteMethods.delete, path, middlewares);
}

export function Options (path : string, middlewares? : RequestHandler[]) : Function {
  return route(ERouteMethods.options, path, middlewares);
}