export default {
  name: 'Todo',
  initialState: () => {},
  commands: {
    ADD_TODO: (state, { payload }) => ({
      type: 'TodoAdded',
      payload: {
        completed: false,
        text: payload.text
      }
    }),
    DELETE_TODO: () => ({
      type: 'TodoDeleted'
    }),
    EDIT_TODO: (state, { payload }) => ({
      type: 'TodoEdited',
      payload: {
        text: payload.text
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
