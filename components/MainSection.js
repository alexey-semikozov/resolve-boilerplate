import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';

export const SHOW_ALL = 'all';
export const SHOW_COMPLETED = 'completed';
export const SHOW_ACTIVE = 'active';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

function renderFooter(completedCount, { todos, filter, actions }) {
  const activeCount = todos.length - completedCount;
  const titles = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed'
  };

  if (todos.length) {
    return (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        titles={titles}
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
