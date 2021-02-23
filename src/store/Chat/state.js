const state = {
  unread_count:null,
  items: {},

  item: {
    conversation_id: null, //conversation_id
    data: [],
    participants: [],
    typing_users: [],
    next_page_url:null,
    prev_page_url:null,
  },
  //struktur untuk item.data
  data_:{
      message:{
          value:null,
      },
      user:{
          id:null,
          name:null,
          avatar:null
      },
      read_at:null
}

};

export default state;
