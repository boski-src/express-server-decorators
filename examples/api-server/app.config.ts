import { IConfig } from '../../src/common/interfaces';

import { putUserToRequest } from './app.middlewares';
import { isAuth } from './app.guards';
import { serverError } from './app.handlers';

import { PostController } from './controllers';

export const AppConfig : IConfig = {
  middlewares: [
    putUserToRequest
  ],
  guards: [
    isAuth
  ],
  handlers: [
    serverError
  ],
  controllers: [
    PostController
  ]
};