import { takeEvery, put, select } from 'redux-saga/effects';
import { createActions } from 'resolve-redux';
import todoAggregate from '../../aggregates';
import { COMPLETE_ALL, CLEAR_COMPLETED } from '../ActionTypes';

const actions = createActions(todoAggregate);

function* handleCompleteAll() {
  const tasks = yield select(state => state.todos);
  const isAllCompleted = tasks.reduce(
    (result, task) => result && task.completed,
    true
  );

  for (let task of tasks) {
    if (!(isAllCompleted ^ task.completed))
      yield put(actions.completeTodo(task.aggregateId));
  }
}

function* handleClearCompleted() {
  const completedTasks = yield select(state =>
    state.todos.filter(todo => todo.completed)
  );

  for (let task of completedTasks) {
    yield put(actions.deleteTodo(task.aggregateId));
  }
}

export default function*() {
  yield [
    takeEvery(COMPLETE_ALL, handleCompleteAll),
    takeEvery(CLEAR_COMPLETED, handleClearCompleted)
  ];
}
