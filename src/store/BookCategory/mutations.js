const mutation = {
  set(state, payload) {
    state.bookcategories = [...payload.bookcategories]
  }
}

export default mutation
