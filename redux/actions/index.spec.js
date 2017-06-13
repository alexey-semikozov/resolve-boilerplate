import { createActions } from 'resolve-redux';
import * as types from '../ActionTypes';
import TodoAggregate from '../../resolve/aggregates';
import * as TodoActions from './index';

const actions = createActions(TodoAggregate, TodoActions);
const aggregateId = 1;
const title = 'Use Redux';
const newTitle = 'Use Redux everywhere';
const aggregateName = 'Todo';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    const action = actions.addTodo(aggregateId, { text: title });

    expect(action.command).toEqual({
      type: 'addTodo'
    });
    expect(action.payload).toEqual({
      text: title
    });
    expect(action.aggregateName).toBe(aggregateName);
    expect(action.aggregateId).toBe(aggregateId);
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    const action = actions.deleteTodo(aggregateId);
    expect(action.command).toEqual({
      type: 'deleteTodo'
    });
    expect(action.aggregateName).toBe(aggregateName);
    expect(action.aggregateId).toBe(aggregateId);
  });

  it('editTodo should create EDIT_TODO action', () => {
    const action = actions.editTodo(aggregateId, newTitle);
    expect(action.command).toEqual({
      type: 'editTodo'
    });
    expect(action.payload).toEqual(newTitle);
    expect(action.aggregateName).toBe(aggregateName);
    expect(action.aggregateId).toBe(aggregateId);
  });

  it('completeTodo should create COMPLETE_TODO action', () => {
    const action = actions.completeTodo(aggregateId);
    expect(action.command).toEqual({
      type: 'completeTodo'
    });
    expect(action.aggregateName).toBe(aggregateName);
    expect(action.aggregateId).toBe(aggregateId);
  });

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toEqual({
      type: types.COMPLETE_ALL
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    });
  });
});
