import createStore from 'resolve-es';
import esDriver from 'resolve-es-file';
import createBus from 'resolve-bus';
import busDriver from 'resolve-bus-memory';
import commandHandler from 'resolve-command';
import query from 'resolve-query';

import todoAggregate from './aggregates';
import todosProjection from './projections';

const eventStore = createStore({
  driver: esDriver({ pathToFile: './db.json' })
});

const bus = createBus({ driver: busDriver() });

const execute = commandHandler({
  store: eventStore,
  bus,
  aggregates: [todoAggregate]
});

const queries = query({
  store: eventStore,
  bus,
  projections: [todosProjection]
});

export default {
  subscribe: bus.onEvent,
  execute,
  query: queries
};
