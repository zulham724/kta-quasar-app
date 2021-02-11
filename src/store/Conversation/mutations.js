const mutation = {
  set(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)
    state.items = {...payload.items, data:[...payload.items.data.map(item=>{
      return {...item}
    })]};
    
  },
  remove(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data.splice(index, 1);
  },
  add(state, payload) {
    // payload.post.isReadMore = false
    const index =state.items.data.findIndex(e=>e.id==payload.item.id);
    if(index==-1){
      state.items.data = [payload.item, ...state.items.data];
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
}

export default mutation
