import axios from "axios";

const actions = {
  index({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.chatUrl}/getunreadconversationbymessages`)
        .then(res => {
          commit("set", { items: res.data });
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  //jika conversation belum ada, maak dibuat jika sudah ada, maka hanya akan diambil id'nya
  create({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.state.Setting.url}/api/v1/conversation`, {
          invited_user_id: payload.invited_user_id
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get({state, commit, dispatch},conversation_id){
    return new Promise((resolve,reject)=>{
      const dataFind = state.items.data.find(e=>e.id==conversation_id)
      if(dataFind)resolve(dataFind);
      else{
        dispatch("show",conversation_id).then(data=>{
          commit("Chat/setParticipants", { items: [data] }, {root:true});
          resolve(data);
        }).catch(err=>{
          alert("error Conversation/get")
          console.log(err);
          reject(err);
        });
      }
    });
  },
  show({}, conversation_id){
    return new Promise((resolve,reject)=>{
      axios.get(`${this.state.Setting.url}/api/v1/conversation/${conversation_id}`).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  next({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${state.items.next_page_url}`)
        .then(res => {
          commit("next", { items: res.data });
          commit("Chat/setParticipants", { items: res.data.data }, {root:true});
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  setUpdatedAt({},conversation){
    return new Promise((resolve,reject)=>{
      axios
      .put(`${this.state.Setting.url}/api/v1/conversation/${conversation.id}`,conversation)
      .then(res => {
        // commit("next", { items: res.data });
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
    });
  },
  prev() { },
  page() { },
  getUnreadCount({state, commit}){
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${this.state.Setting.url}/api/v1/conversations/get_unread_count`)
        .then(res => {
          commit("setUnreadCount", { unread_count: res.data.unread_count });
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

};

export default actions;
