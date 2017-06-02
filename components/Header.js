import React from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';

function Header(props) {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => text.length && props.addTodo(text)}
        placeholder="What needs to be done?"
      />
    </header>
  );
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
