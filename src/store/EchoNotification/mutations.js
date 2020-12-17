const mutation = {
  set(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)
    state.items = {
      ...payload.items,
      data: [
        ...payload.items.data.map(item => {
          return { ...item };
        })
      ]
    };
    //console.log('anjim')
    //console.log(state.items)
  },
  next(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)

    let filereditems = payload.items.data.filter(item => {
      return state.items.data.find(e => e.id == item.id) ? false : true;
    });
    state.items = {
      ...payload.items,
      data: [...state.items.data, ...filereditems]
    };
  },
  addNotification(state, notification) {
    if (!state.items.data.find(e => e.id == notification.data.id)) {
      let new_item = {
        id: notification.data.id,
        type: notification.type,
        data: { data: { ...notification.data } }
      };
      console.log("new item");
      console.log(new_item);
      //delete new_item.comment;
      console.log("addNotification");
      console.log(state.items.data);
      state.items.data.unshift(new_item);
      state.unread_count++;
    }
  },
  setCount(state, count) {
    state.unread_count = count;
  },
  deleteItems(state) {
    state.items = {};
  }
}

export default mutation
