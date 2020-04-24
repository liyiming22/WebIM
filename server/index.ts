import app from './app';
import { HOST, SERVER_PORT } from './config/environment';

const server = app.listen(SERVER_PORT, HOST, () => {
  console.log('  App is running at %s', server.address());
});
