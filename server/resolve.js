import createEventStore from 'resolve-es';
import createStorage from 'resolve-storage';
import storageDriver from 'resolve-storage-file';
import createBus from 'resolve-bus';
import busDriver from 'resolve-bus-memory';
import commandHandler from 'resolve-command';
import query from 'resolve-query';

import todosAggregate from '../aggregates';
import todosProjection from '../projections';

const storage = createStorage({
  driver: storageDriver({ pathToFile: './db.json' })
});

const bus = createBus({ driver: busDriver() });

const eventStore = createEventStore({ storage, bus });

const execute = commandHandler({
  eventStore,
  aggregates: [todosAggregate]
});

const queries = query({
  eventStore,
  projections: [todosProjection]
});

export default {
  subscribe: bus.onEvent,
  execute,
  query: queries
};