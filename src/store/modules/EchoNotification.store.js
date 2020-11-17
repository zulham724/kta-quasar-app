/* Module1.store.js */
import axios from "axios";
// State object
import Echo from "laravel-echo";
import Vue from "vue";
import VueEcho from "vue-echo-laravel";

const state = {
  items: {},
  unread_count: 0,
  Echo: null
};

// Mutations
const mutations = {
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
    // console.log('cc')
    // console.log(state.items.data)
    console.log(state.items);
    if (!state.items.data.find(e => e.id == notification.id)) {
      let new_item = {
        ...notification,
        data: { data: { ...notification.data } }
      };
      //delete new_item.comment;
      console.log("addNotification");
      console.log(new_item);
      console.log(state.items.data);
      state.items.data.unshift({ ...new_item });
      state.unread_count++;
    }
  },
  setCount(state, count) {
    state.unread_count = count;
  }
};

// Actions
const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/notification`)
        .then(res => {
          commit("set", { items: res.data });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
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
//   addNotification({ commit, state, dispatch }, notification) {
//     commit("addNotification", notification);
//   },
  getCount({ commit }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${this.state.Setting.url}/api/v1/notification_total`)
        .then(res => {
          commit("setCount", res.data.unread_notifications_count);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  markAsRead({ commit }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .post(`${this.state.Setting.url}/api/v1/notification_markasread`)
        .then(res => {
          commit("setCount", 0);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  initNotification({ state, dispatch }, payload) {
    if (!state.items.data) {
      Promise.all([dispatch("index"), dispatch("getCount")]).then(res => {
        console.log("init gan");
        console.log(state.items.data);
        console.log(state.unread_count);
        dispatch("connectServer").then(res => {
            console.log('connectServer sukses')
          dispatch("subscribeNotification")
        }).catch(err=>{
          alert(err)
        });
      });
      // this.$store.dispatch("EchoNotification/index");
      // this.$store.dispatch('EchoNotification/getCount');
    } else {
        //console.log('fail connectServer')
        dispatch("subscribeNotification");
    }
  },
  connectServer({ state ,rootState }) {
    console.log('connect to Notification server')
    const url = rootState.Setting.url;
    return new Promise((resolve, reject) => {
      let token=rootState.Auth.token;
      if (!Vue.prototype.$echo && token.token_type!=null) {
        console.log('token for Notification broadcast')
        console.log(token)
        Vue.use(VueEcho, {
          //broadcaster: "socket.io",
          broadcaster: "pusher",
          key:"c59b9918ea05165dbe03",
          //host: "http://localhost:8000",
          authEndpoint: url+'/broadcasting/auth',
          cluster:'ap1',
          forceTLS: true,
          auth: {
            headers: { 
              Authorization: `${token.token_type} ${token.access_token}`
            }
          }
        });
      }else{
          console.log('token kosong')
      }
      resolve(token)
      
      // Vue.prototype.$connect(token).then(res=>{
      //   resolve()
      // }).catch((err)=>{
      //   reject(err)
      // })
    });
  },
  subscribeNotification({ commit, rootState }) {
    //console.log(this.state.Auth)
    if (rootState.Auth.auth.id &&  Vue.prototype.$echo) {
      let channel = "App.Models.User." + this.state.Auth.auth.id;
      console.log("Subscribing to notification channel:" + channel);
  //console.log(Vue.prototype.$echo)
      Vue.prototype.$echo.private(channel).notification(notification => {
            console.log(notification);
            commit(
                "addNotification",
                notification
            );
        });
    } else {
      console.log("user belum login atau belum connect ke server broadcast");
    }
  }
};

// Getter functions
const getters = {
  cokk: state => state.items.data,
  test(state) {
    return state.items;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
