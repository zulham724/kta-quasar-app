const mutation = {
  set(state, payload) {
    state.items = [...payload.items.map(item => {
        if (item.file) item.file.src = eval(item.file.src)[0];
        return item
    })]
  },
  add(state, payload) {
      if (payload.item.file) payload.item.file.src = eval(payload.item.file.src);
      state.items = [payload.item, ...state.items];
  },
  remove(state, payload) {
      const index = state.items.findIndex(item => item.id == payload.id);
      state.items.splice(index, 1);
  }
}

export default mutation
