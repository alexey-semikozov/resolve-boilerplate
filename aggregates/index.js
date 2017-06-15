export default {
  name: 'Todo',
  initialState: () => {},
  commands: {
    addTodo: (state, { payload }) => ({
      type: 'TodoAdded',
      payload: {
        completed: false,
        text: payload.text
      }
    }),
    deleteTodo: () => ({
      type: 'TodoDeleted'
    }),
    editTodo: (state, { payload }) => ({
      type: 'TodoEdited',
      payload: {
        text: payload.text
      }
    }),
    completeTodo: state => ({
      type: 'TodoCompleted',
      payload: {
        completed: true
      }
    })
  }
};
