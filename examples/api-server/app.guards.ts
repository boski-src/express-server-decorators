import { INext, IRequest, IResponse } from '../../src/common/interfaces';

export class AppGuards {

  public isAuth (req : IRequest, res : IResponse, next : INext) : void {
    if (!req.user) next({ status: 401, message: 'Unauthenticated.' });
    next();
  }

}

export const appGuards = new AppGuards();
export const { isAuth } = appGuards;