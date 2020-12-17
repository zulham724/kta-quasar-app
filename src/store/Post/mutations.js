
const mutation = {
  set(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)
    state.posts = {...payload.posts, data:[...payload.posts.data.map(item=>{
      return {...item}
    })]};
    
  },
  remove(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data.splice(index, 1);
  },
  add(state, payload) {
    // payload.post.isReadMore = false
    state.posts.data = [payload.post, ...state.posts.data];
  },
  next(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)
    state.posts = {
      ...payload.posts,
      data: [...state.posts.data, ...payload.posts.data]
    };
  },
  update(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data[index].body = payload.body
  },
  addReadMore(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data[index].isReadMore = false
  },
  setReadMore(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data[index].isReadMore = true
  },
  setSize(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    if(index>-1)state.posts.data[index].size = payload.size
  },
  like(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data[index].liked_count = payload.liked_count
    state.posts.data[index].likes_count = payload.likes_count
  },
  dislike(state, payload) {
    const index = state.posts.data.findIndex(item => item.id == payload.id);
    state.posts.data[index].liked_count = payload.liked_count
    state.posts.data[index].likes_count = payload.likes_count
  }
}

export default mutation
