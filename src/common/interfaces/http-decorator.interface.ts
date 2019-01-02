import { RequestHandler } from 'express';
import { RequestParamHandler } from 'express-serve-static-core';

import { ERouteMethods } from '../enums';

export interface IHttpDecoratorRoute {
  method : string
  path : string
  middlewares : RequestHandler[]
  handlerKey : string
}

export interface IHttpDecoratorController {
  target : any
  basePath : string
  guards : RequestHandler[]
  params : IHttpDecoratorRouterParam[]
  routes : IHttpDecoratorRoute[]
}

export interface IHttpDecoratorMiddleware {
  guards? : RequestHandler[]
  params? : IHttpDecoratorRouterParam[]
}

export type IHttpDecoratorRouterParam = {
  name : string
  handler : RequestParamHandler
}

export interface IHttpDecoratorLink {
  action : string,
  method : ERouteMethods
  href : string
}