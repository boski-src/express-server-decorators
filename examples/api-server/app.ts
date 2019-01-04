import { ExpressApp } from '../../src/express-app';

import { AppConfig } from './app.config';

export class App extends ExpressApp {

  public configure () {
    this.defaultConfig();
  }

}

export const app : App = new App(AppConfig, '', (e : any) => console.log);
