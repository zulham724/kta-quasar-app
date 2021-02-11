const state = {
  items: [],

  item: {
    conversation_id: null, //conversation_id
    data: [],
    typing_user: []
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
      }
}

};

export default state;
