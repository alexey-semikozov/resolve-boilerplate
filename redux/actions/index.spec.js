import * as types from '../ActionTypes';
import * as actions from './index';

const checkId = (id) => (id !== null && id !== undefined && id !== '');
const aggregateId = 1;
const title = 'Use Redux';
const newTitle = 'Use Redux everywhere';
const aggregateName = 'Todo';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    const action = actions.addTodo(title);
    expect(action.command).toEqual({
      type: types.ADD_TODO
    });
    expect(action.payload).toEqual({
      text: title
    });
    expect(action.aggregateName).toBe(aggregateName);
    expect(checkId(action.aggregateId)).toBe(true);
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    const action = actions.deleteTodo(aggregateId);
    expect(action.command).toEqual({
      type: types.DELETE_TODO
    });
    expect(action.payload).toEqual({});
    expect(action.aggregateName).toBe(aggregateName);
    expect(action.aggregateId).toBe(aggregateId);
  });

  it('editTodo should create EDIT_TODO action', () => {
    const action = actions.editTodo(aggregateId, newTitle);
    expect(action.command).toEqual({
      type: types.EDIT_TODO
    });
    expect(action.payload).toEqual({
      text: newTitle
    });
    expect(action.aggregateName).toBe(aggregateName);
    expect(action.aggregateId).toBe(aggregateId);
  });

  it('completeTodo should create COMPLETE_TODO action', () => {
    const action = actions.completeTodo(aggregateId);
    expect(action.command).toEqual({
      type: types.COMPLETE_TODO
    });
    expect(action.payload).toEqual({});
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
