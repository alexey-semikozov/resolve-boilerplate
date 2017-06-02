import createExpress from 'express';
import next from 'next';
import http from 'http';
import socketIO from 'socket.io';
import uuid from 'uuid';

import resolve from '../resolve';

import projection from '../resolve/projections';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const express = createExpress();
    const server = http.Server(express);
    const io = socketIO(server);

    express.use(createExpress.static('static'));

    express.get('/:filter?', (req, res) => {
      const actualPage = '/';
      const queryParams = { filter: req.params.filter };

      resolve.query('todos').then(state => {
        req.initialState = state;
        app.render(req, res, actualPage, queryParams);
      });
    });

    express.get('*', (req, res) => handle(req, res));

    io.on('connection', socket => {
      console.log('Socket connected');
      socket.on('command', command => {
        command.aggregateId = command.aggregateId || uuid.v4();
        resolve.execute(command).catch(err => console.log(err));
      });

      const unsubscribe = resolve.subscribe(
        Object.keys(projection.eventHandlers),
        event => socket.emit('event', event)
      );

      socket.on('disconnect', () => unsubscribe());
    });

    server.on('listening', () => {
      console.log('Example app listening on port 3000!');
    });

    server.listen(3000);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
