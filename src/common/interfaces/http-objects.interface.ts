import { NextFunction, Request, Response, Send } from 'express';

import { IHttpDecoratorLink } from './http-decorator.interface';

export interface IRequest extends Request {
  links? : IHttpDecoratorLink[]
  docs? : string
  body : any,
  query : any,
  params : any,
  [key : string]: any
}

export interface IResponse extends Response {
  jsonResponse? : Send
}

export interface INext extends NextFunction {
}