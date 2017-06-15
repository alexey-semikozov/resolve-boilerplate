import createExpress from 'express';
import next from 'next';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';

import resolve from './resolve';

import projection from '../projections';

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
    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({ extended: true }));

    express.get('/:filter?', (req, res) => {
      const actualPage = '/';
      const queryParams = { filter: req.params.filter };

      resolve.query('todos').then(state => {
        req.initialState = state;
        app.render(req, res, actualPage, queryParams);
      });
    });

    express.get('*', (req, res) => handle(req, res));

    express.post('/api/commands', (req, res) => {
      resolve
        .execute(req.body)
        .then(() => res.status(200).send('ok'))
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    });

    io.on('connection', socket => {
      console.log('Socket connected');

      const unsubscribe = resolve.subscribe(
        Object.keys(projection.eventHandlers),
        event => socket.emit('event', JSON.stringify(event))
      );

      socket.on('disconnect', () => unsubscribe());
    });

    server.on('listening', () => {
      console.log('> Ready on http://localhost:3000');
    });

    server.listen(3000);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
