import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

function renderTodoCount(activeCount) {
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <span className="todo-count">
      <strong>{activeCount || 'No'}</strong> {itemWord} left
    </span>
  );
}

function renderFilterLink({ filter, selectedFilter }) {
  return (
    <Link href={`/?filter=${filter}`} as={`/${filter}`}>
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
      >
        {FILTER_TITLES[filter]}
      </a>
    </Link>
  );
}

function Footer(props) {
  return (
    <footer className="footer">
      {renderTodoCount(props.activeCount)}
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
            {renderFilterLink({
              filter,
              selectedFilter: props.filter
            })}
          </li>
        ))}
      </ul>
    </footer>
  );
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired
};

export default Footer;
