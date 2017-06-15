import Immutable from 'seamless-immutable';

export default {
  name: 'todos',
  initialState: Immutable({ todos: [] }),

  eventHandlers: {
    TodoAdded: (state, event) =>
      state.setIn(
        ['todos'],
        [
          {
            aggregateId: event.aggregateId,
            completed: event.payload.completed,
            text: event.payload.text
          }
        ].concat(state.todos)
      ),
    TodoDeleted: (state, event) =>
      state.setIn(
        ['todos'],
        state.todos.filter(item => item.aggregateId !== event.aggregateId)
      ),
    TodoEdited: (state, event) =>
      state.setIn(
        ['todos'],
        state.todos.map(
          todo =>
            (todo.aggregateId === event.aggregateId
              ? { ...todo, text: event.payload.text }
              : todo)
        )
      ),
    TodoCompleted: (state, event) =>
      state.setIn(
        ['todos'],
        state.todos.map(
          todo =>
            (todo.aggregateId === event.aggregateId
              ? { ...todo, completed: !todo.completed }
              : todo)
        )
      )
  }
};
