import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createActions, actions } from 'resolve-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Header from '../components/Header';

import MainSection, {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../components/MainSection';

import todoAggregate from '../aggregates/todo';

const App = props => {
  const { todos, filter, actions } = props;
  return (
    <div className="todoapp">
      <Head>
        <link rel="icon" type="image/ico" href="favicon.ico" />
        <link rel="stylesheet" href="index.css" />
      </Head>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} filter={filter} />
    </div>
  );
};

App.getInitialProps = ({req, store, isServer}) => {
  if (isServer) {
    const initialState = req ? req.initialState : undefined;
    store.dispatch(actions.merge('todos', { 'todos': initialState.todos}));
  }
};

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  filter: [SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].indexOf(
    ownProps.url.query.filter
  ) >= 0
    ? ownProps.url.query.filter
    : SHOW_ALL
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(createActions(todoAggregate), dispatch)
});

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(App);
