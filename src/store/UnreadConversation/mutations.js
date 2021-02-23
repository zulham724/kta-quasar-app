const mutation = {
  set(state, { items }) {
    // payload.posts.data.map(item => item.isReadMore = false)
    state.items = { data: items };

  },
  remove(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data.splice(index, 1);
  },
  add(state, payload) {
    // payload.post.isReadMore = false
    const find = state.items.data.find(e => e.id == payload.item.id);
    if (!find) {
      state.items.data = [payload.item, ...state.items.data];
    }

    // console.log(state.items.data);
  },
  addTop(state, payload) {
    // payload.post.isReadMore = false
    // if(state.items)
    const index = state.items.data.findIndex(e => e.id == payload.item.id);
    if (index == -1) {
      state.items.data.unshift(payload.item); // [payload.item, ...state.items.data];
    } else {
      state.items.data.splice(index, 1);
      state.items.data.unshift(payload.item); //  [payload.item, ...state.items.data];
    }

    // console.log(state.items.data);
  },
  moveTop(state, conversation_id) {
    // payload.post.isReadMore = false
    // if(state.items.data){
    if (state.items.total) {
      const index = state.items.data.findIndex(e => e.id == conversation_id);
      if (index > -1) {
        const item = { ...state.items.data[index] }
        state.items.data.splice(index, 1);
        state.items.data.unshift(item);
      }
    }


    // console.log(state.items.data);
  },
  update(state, payload) {
    // payload.post.isReadMore = false
    const index = state.items.data.findIndex(e => e.id == payload.item.id);
    if (index > -1) {
      state.items.data[index].updated_at = payload.item.updated_at;
    }

    // console.log(state.items.data);
  },
  next(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)
    state.items = {
      ...payload.items,
      data: [...state.items.data, ...payload.items.data]
    };
  },
  setUnreadCount(state, { unread_count }) {
    state.unread_count = unread_count;
  },
  add(state, { conversation_id }) {
    if (state.items.data) {
      const find = state.items.data.find(e => e.conversation_id == conversation_id);
      if (!find) state.items.data.push({ conversation_id: conversation_id })
    }

  },
  setRead(state, { conversation_id, read_at }) {
    const findData = state.items.data.find(e => e.id == conversation_id);
    if (findData) {
      findData.read_at = read_at;
    }
  }

}

export default mutation
