import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

function renderToggleAll(completedCount, { todos, actions }) {
  if (todos.length > 0) {
    return (
      <input
        className="toggle-all"
        type="checkbox"
        checked={completedCount === todos.length}
        onChange={actions.completeAll}
      />
    );
  }
}

function renderFooter(completedCount, { todos, filter, actions }) {
  const activeCount = todos.length - completedCount;

  if (todos.length) {
    return (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={actions.clearCompleted}
      />
    );
  }
}

function MainSection(props) {
  const { todos, actions, filter } = props;
  const filteredTodos = todos.filter(TODO_FILTERS[filter]);
  const completedCount = todos.reduce(
    (count, todo) => (todo.completed ? count + 1 : count),
    0
  );

  return (
    <section className="main">
      {renderToggleAll(completedCount, props)}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.aggregateId} todo={todo} {...actions} />
        ))}
      </ul>
      {renderFooter(completedCount, props)}
    </section>
  );
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
