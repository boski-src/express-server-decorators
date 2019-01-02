import { app } from './app';

async function bootstrap (port : number) : Promise<number> {
  app.run(port);

  return port;
}

bootstrap(8000)
  .then((port : number) => console.log('Server started on port:', port))
  .catch((e : Error) => console.log('Server starting error:', e));

process.on('SIGINT', () => {
  app.server.close();
  process.exit();
});