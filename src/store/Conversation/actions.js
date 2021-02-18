import axios from "axios";

const actions = {
  index({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/conversation`)
        .then(res => {
          commit("set", { items: res.data });
          resolve(res);
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
  get({state, dispatch}, conversation_id){
    return new Promise((resolve,reject)=>{
      if(state.items.data){
        const index = state.items.data.findIndex(e=>e.id==conversation_id)
        if(index>-1)resolve(state.items.data[index]);
        else reject('Conversation '+conversation_id+' tidak ada');
      }else{
        axios.get(`${this.state.Setting.url}/api/v1/conversation/${conversation_id}`).then(res=>{
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        });
      }
    })
  },
  next({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${state.items.next_page_url}`)
        .then(res => {
          commit("next", { items: res.data });
          resolve(res);
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
};

export default actions;
