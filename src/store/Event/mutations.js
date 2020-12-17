const mutation = {
  set(state, payload) {
    state.events = payload.events;
  },
  add(state, payload) {
    state.events.data = [payload.event, ...state.events.data];
  },
  next(state, payload) {
    state.events = {
      ...payload.events,
      data: [...state.events.data, ...payload.events.data]
    };
  }
}

export default mutation
