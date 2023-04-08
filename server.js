import {handler} from './build/handler.js';
import express from 'express';
import pkg from 'lightship';
const {createLightship} = pkg;
import http from 'http';
import promBundle from 'express-prom-bundle';
import compression from 'compression';
import './logging.js';
import logger from 'morgan';
import mime from 'mime-types';

if (process.env.NODE_ENV === '') {
  process.env.NODE_ENV = 'production';
}

(async () => {

  const [bindHost, bindPort] = process.env.LISTEN.split(':');
  const lightship = await createLightship({
    port: 81,
  });


  const app = express();

  app.disable('x-powered-by');
  app.set('port', parseInt(bindPort, 10));
  app.set('trust proxy', 1);

  app.get('/health/ready', (_req, res) => {
    res.send('OK').end();
  });

  app.get('/health/alive', (_req, res) => {
    res.send('OK').end();
  });

  app.use(promBundle({
    includeMethod: true,
    includePath: false,
    includeStatusCode: true,
  }));

  app.use(compression());

  app.use(logger(':date[iso] :method :url :status :res[content-length] - :response-time ms - :remote-addr : :req[True-Client-Ip] - :req[user-agent]', {
    skip: (_req, res) => (res.statusCode < 400 && ["debug", "info"].indexOf(process.env.LOG_LEVEL) === -1),
  }));

  app.use('/', (req, res, next) => {

    const staticImmutables = [
      'model/gltf-binary',
      'model/gltf+json',
      'model/vnd.gltf.binary',
      'model/vnd.gltf+json',
      'model/gltf',
      'model/vnd.gltf',
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/gif',
    ];

    const m = mime.lookup(req.path);

    if (m && staticImmutables.includes(m)) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    next();
  });

  app.use(handler);

  const server = http.createServer(app);

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(process.env.BIND + ' requires elevated privileges');
        process.exit(1);
      // eslint-disable-next-line no-fallthrough
      case 'EADDRINUSE':
        console.error(process.env.BIND + ' is already in use');
        process.exit(1);
      // eslint-disable-next-line no-fallthrough
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr?.port;
    console.log('*** Listening on ' + bind);
    lightship.signalReady();
  }

  server.listen(parseInt(bindPort, 10), bindHost);
  server.on('error', onError);
  server.on('listening', onListening);

  lightship.registerShutdownHandler(() => {

    setTimeout(() => {
      server.close();
    }, 10000);

  });



})();
