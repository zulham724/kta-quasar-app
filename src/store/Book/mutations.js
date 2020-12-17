const mutation = {
  set(state, payload) {
    state.books = [...payload.books]
  },
  add(state, payload) {
      state.books = [payload.book, ...state.books];
  },
  remove(state, payload) {
      const index = state.books.findIndex(item => item.id == payload.id);
      state.books.splice(index, 1);
  }
}

export default mutation
