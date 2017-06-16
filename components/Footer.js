import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';

function renderTodoCount(activeCount) {
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <span className="todo-count">
      <strong>{activeCount || 'No'}</strong> {itemWord} left
    </span>
  );
}

function renderFilterLink({ filter, titles, selectedFilter }) {
  return (
    <Link href={`/?filter=${filter}`} as={`/${filter}`}>
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
      >
        {titles[filter]}
      </a>
    </Link>
  );
}

function Footer(props) {
  return (
    <footer className="footer">
      {renderTodoCount(props.activeCount)}
      <ul className="filters">
        {Object.keys(props.titles).map(filter => (
          <li key={filter}>
            {renderFilterLink({
              filter,
              titles: props.titles,
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
  filter: PropTypes.string.isRequired,
  titles: PropTypes.object.isRequired
};

export default Footer;
