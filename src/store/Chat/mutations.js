const mutation = {
  add(state, payload) {
    const index = state.items.findIndex(
      e => e.conversation_id == payload.conversation_id
    );
    if (index > -1) {
      state.items[index].data.push(payload.item);
    } else {
      state.items.push({
        conversation_id: payload.conversation_id,
        data: [payload.item], //data = untuk menampung message
        typing_users: [] //typing_user = untuk menampung user list yg sedang mengetik
      });
    }
    // console.log('statestate);
  },
  set(state, payload) {
    const index = state.items.findIndex(
      e => e.conversation_id == payload.conversation_id
    );
    const item = {
      conversation_id: payload.conversation_id,
      data: [],
      typing_users: []
    };
    if (index > -1) {
      state.items[index] = item;
    } else {
      state.items.push(item);
    }
  },
  addTypingUser(state, { conversation_id, user }) {
    const index = state.items.findIndex(
      e => e.conversation_id == conversation_id
    );
    //jika data conversation'nya ada, maka tambah typing_users jika tidak ada
    if (index > -1) {
      const index2 = state.items[index].typing_users.findIndex(e=>e.id==user.id);
      if(index2 == -1){
        state.items[index].typing_users.push(user);
      }
    }else{
      state.items.push({
        conversation_id: conversation_id,
        data: [], //data = untuk menampung message
        typing_users: [user] //typing_user = untuk menampung user list yg sedang mengetik
      });
    }
  },
  removeTypingUser(state, { conversation_id, user }) {
    const index = state.items.findIndex(
      e => e.conversation_id == conversation_id
    );
    //jika data conversation'nya ada, maka cari typing_users dan hapus jika ada
    if (index > -1) {
      const index2 = state.items[index].typing_users.findIndex(e=>e.id==user.id);
      if(index2 > -1){
        state.items[index].typing_users.splice(index2,1);
      }
    }
  }

};

export default mutation;
