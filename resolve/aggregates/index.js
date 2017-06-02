export default {
  name: 'Todo',
  initialState: () => {},
  commands: {
    ADD_TODO: (state, { text }) => ({
      type: 'TodoAdded',
      payload: {
        completed: false,
        text
      }
    }),
    DELETE_TODO: () => ({
      type: 'TodoDeleted'
    }),
    EDIT_TODO: (state, { text }) => ({
      type: 'TodoEdited',
      payload: {
        text
      }
    }),
    COMPLETE_TODO: state => ({
      type: 'TodoCompleted',
      payload: {
        completed: true
      }
    })
  }
};
