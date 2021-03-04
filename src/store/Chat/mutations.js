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
          typing_users: [], //typing_user = untuk menampung user list yg sedang mengetik
          participants: []
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
  addBulk(state, { conversation_id, data }) {
    const key = "personal_conversation_" + conversation_id;
    // filter pesan berdasarkan ID yang belum ada di data array
    const new_data = data.filter(e=>!state.items[key].data.find(e2=>e2.message.id==e.message.id))

    if (state.items[key]) {        
      state.items[key].data = [...new_data, ...state.items[key].data];
    } else {
      state.items = {
        ...state.items,
        [key]: { //referensi: https://stackoverflow.com/questions/41292468/adding-a-key-from-a-variable-string-es6-when-using-spread-syntax
          conversation_id: conversation_id,
          data: new_data, //data = untuk menampung message
          typing_users: [] //typing_user = untuk menampung user list yg sedang mengetik
        }
      };
    }
  },
  init(state, payload) {
    const key = "personal_conversation_" + payload.conversation_id;
    if (!state.items[key]) {
      state.items = {
        ...state.items,
        [key]: { //referensi: https://stackoverflow.com/questions/41292468/adding-a-key-from-a-variable-string-es6-when-using-spread-syntax
          conversation_id: payload.conversation_id,
          data: [], //data = untuk menampung message
          typing_users: [] //typing_user = untuk menampung user list yg sedang mengetik
        }
      };
    }
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
      if (index>-1) {
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
  },
  setParticipants(state, { items }) {
    items.forEach(item => {
      const key = "personal_conversation_" + item.id;
      if (state.items[key]) {
        state.items[key].participants = [...item.participants]
      } else {
        state.items = {
          ...state.items,
          [key]: { //referensi: https://stackoverflow.com/questions/41292468/adding-a-key-from-a-variable-string-es6-when-using-spread-syntax
            conversation_id: item.id,
            data: [],
            participants: [...item.participants],
            typing_users: [],
            next_page_url: null,
            prev_page_url: null,
          }
        };
      }
    });
  },
  setNextUrl(state, {conversation_id,next_page_url}){
    const key = "personal_conversation_" + conversation_id;
    if(state.items[key]){
      state.items[key].next_page_url = next_page_url;
    }
  },
  setPrevUrl(state, {conversation_id,prev_page_url}){
    const key = "personal_conversation_" + conversation_id;
    if(state.items[key]){
      state.items[key].prev_page_url = prev_page_url;
    }
  },
  setChatByIds(state, { chats }) {
    chats.forEach(conversation => {
      const key = "personal_conversation_" + conversation.id;
      this._vm.$devLogger('set chats for', key);
      if (!state.items[key]) {
        state.items = {
          ...state.items,
          [key]: { //referensi: https://stackoverflow.com/questions/41292468/adding-a-key-from-a-variable-string-es6-when-using-spread-syntax
            conversation_id: conversation.id,
            data: [], //data = untuk menampung message
            typing_users: [] //typing_user = untuk menampung user list yg sedang mengetik
          }
        };
      }

      // list senders
      const sender_list = [];
      conversation.chats.data.forEach(v => {
        if (sender_list.indexOf(v.sender_id) == -1) {
          sender_list.push(v);
        }
      })
      this._vm.$devLogger('sender list from conversation_id', conversation.id, ':', sender_list);

      // conversation.chats.data.forEach(chat=>{
      //   // mendapatkan object user dari items[index].participants
      //   const sender = state.items[key].participants.find(e=>e.id==chat.sender_id);
      //   const data = {
      //     message:{
      //       value:chat.value,
      //     },
      //     user:{
      //       id:sender.id,
      //       name:sender.name,
      //       avatar:sender.avatar
      //     }
      //   }
      // });


      // state.items[key].data = 

    });
  },
  setUnreadCount(state, {unread_count}){
    state.unread_count = unread_count;
  },
  addUnreadCount(state, value){
    state.unread_count = state.unread_count+value;
  },
  updateItems(state, {conversation_id,items,read_at}){
    const key = "personal_conversation_" + conversation_id;
    if(state.items[key] && state.items[key].data){
      items.forEach(item=>{
        const find = state.items[key].data.find(e=>e.message.id==item.id);
        if(find){
          find.read_at = read_at;
          this._vm.$devLogger('update read_at in',find);
        }
      })
    }
   
  }
};

export default mutation;
