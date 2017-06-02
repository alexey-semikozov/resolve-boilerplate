import * as types from '../ActionTypes';

const aggregateName = 'Todo';

export const addTodo = text => ({ aggregateName, type: types.ADD_TODO, text });
export const deleteTodo = aggregateId => ({
  aggregateName,
  type: types.DELETE_TODO,
  aggregateId
});
export const editTodo = (aggregateId, text) => ({
  aggregateName,
  type: types.EDIT_TODO,
  aggregateId,
  text
});
export const completeTodo = aggregateId => ({
  aggregateName,
  type: types.COMPLETE_TODO,
  aggregateId
});

export const completeAll = () => ({ type: types.COMPLETE_ALL });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
