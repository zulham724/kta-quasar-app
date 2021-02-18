const mutation = {
  add(state, payload) {
    const key = "personal_conversation_" + payload.conversation_id;
    if (state.items[key]) {
      state.items[key].data.push(payload.item);
    } else {
      state.items = {
        ...state.items,
        [key]: { //referensi: https://stackoverflow.com/questions/41292468/adding-a-key-from-a-variable-string-es6-when-using-spread-syntax
          conversation_id: payload.conversation_id,
          data: [payload.item], //data = untuk menampung message
          typing_users: [] //typing_user = untuk menampung user list yg sedang mengetik
        }
      };
    }
    // const index = state.items.findIndex(
    //   e => e.conversation_id == payload.conversation_id
    // );
    // if (index > -1) {
    //   state.items[index].data.push(payload.item);
    // } else {
    //   state.items.push({
    //     conversation_id: payload.conversation_id,
    //     data: [payload.item], //data = untuk menampung message
    //     typing_users: [] //typing_user = untuk menampung user list yg sedang mengetik
    //   });
    // }
    // console.log('statestate);
  },
  set(state, payload) {
   
  },
  addTypingUser(state, { conversation_id, sender }) {
    const key = "personal_conversation_" + conversation_id;
    if (state.items[key]) {
      const index = state.items[key].typing_users.findIndex(
        e => e.id == sender.id
      );
      if (index == -1) {
        state.items[key].typing_users.push(sender);
      }
    } else {
      state.items = {
        ...state.items,
        [key]: { //referensi: https://stackoverflow.com/questions/41292468/adding-a-key-from-a-variable-string-es6-when-using-spread-syntax
          conversation_id: conversation_id,
          data: [], //data = untuk menampung message
          typing_users: [sender] //typing_user = untuk menampung user list yg sedang mengetik
        }
      };
    }


    // const index = state.items.findIndex(
    //   e => e.conversation_id == conversation_id
    // );
    // //jika data conversation'nya ada, maka tambah typing_users jika tidak ada
    // if (index > -1) {
    //   const index2 = state.items[index].typing_users.findIndex(
    //     e => e.id == user.id
    //   );
    //   if (index2 == -1) {
    //     state.items[index].typing_users.push(user);
    //   }
    // } else {
    //   state.items.push({
    //     conversation_id: conversation_id,
    //     data: [], //data = untuk menampung message
    //     typing_users: [user] //typing_user = untuk menampung user list yg sedang mengetik
    //   });
    // }
  },
  removeTypingUser(state, { conversation_id, sender }) {
    const key = "personal_conversation_" + conversation_id;
    if (state.items[key]) {
      const index = state.items[key].typing_users.findIndex(
        e => e.id == sender.id
      );
      if (index > -1) {
        state.items[key].typing_users.splice(index, 1);
      }
    }

    // const index = state.items.findIndex(
    //   e => e.conversation_id == conversation_id
    // );
    //jika data conversation'nya ada, maka cari typing_users dan hapus jika ada
    // if (index > -1) {
    //   const index2 = state.items[index].typing_users.findIndex(
    //     e => e.id == user.id
    //   );
    //   if (index2 > -1) {
    //     state.items[index].typing_users.splice(index2, 1);
    //   }
    // }
  }
};

export default mutation;
