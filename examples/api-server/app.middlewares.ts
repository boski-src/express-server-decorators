import { INext, IRequest, IResponse } from '../../src/common/interfaces';

export class AppMiddlewares {

  public putUserToRequest (req : IRequest, res : IResponse, next : INext) : void {
    // 1 or 2
    if (Math.floor(Math.random() * 2) + 1 === 1) {
      req.user = {
        id: 1,
        email: 'test@example.com',
      };
    }
    next();
  }

}

export const appMiddlewares = new AppMiddlewares();
export const { putUserToRequest } = appMiddlewares;