import { actions as ResolveActions } from 'resolve-redux';
import uuidV4 from 'uuid/v4';
import * as types from '../ActionTypes';

const aggregateName = 'Todo';

export const addTodo = text =>
  ResolveActions.sendCommand({
    command: {
      type: types.ADD_TODO
    },
    payload: {
      text
    },
    aggregateId: uuidV4(),
    aggregateName
  });

export const deleteTodo = aggregateId =>
  ResolveActions.sendCommand({
    command: {
      type: types.DELETE_TODO
    },
    payload: {},
    aggregateId,
    aggregateName
});

export const editTodo = (aggregateId, text) =>
  ResolveActions.sendCommand({
    command: {
      type: types.EDIT_TODO
    },
    payload: {
      text
    },
    aggregateId,
    aggregateName
});

export const completeTodo = aggregateId =>
  ResolveActions.sendCommand({
    command: {
      type: types.COMPLETE_TODO
    },
    payload: {
    },
    aggregateId,
    aggregateName
});

export const completeAll = () => ({ type: types.COMPLETE_ALL });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
