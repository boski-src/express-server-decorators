import { INext, IRequest, IResponse } from '../../src/common/interfaces';

import { app } from './app';

export class AppHandlers {

  public serverError (err : any, req : IRequest, res : IResponse, next : INext) : void {
    app.jsonResponse({ status: err.status, error: err.message })(res);
  }

}

export const appHandlers = new AppHandlers();
export const { serverError } = appHandlers;