import axios from "axios";
import Echo from "laravel-echo";

const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/notification?type=likedpostnotification,likedcommentnotification,commentedpostnotification,alsocommentedpostnotification`)
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
        console.log("init Notifikasi gan");
        console.log(state.items.data);
        console.log(state.unread_count);
        dispatch("connectServer")
          .then(res => {
            console.log("connectServer sukses > ");
            console.log(res);
            dispatch("subscribeNotification");
          })
          .catch(err => {
            alert(err);
          });
      });
      // this.$store.dispatch("EchoNotification/index");
      // this.$store.dispatch('EchoNotification/getCount');
    } else {
      //console.log('fail connectServer')
      console.log(state.items.data);
      dispatch("subscribeNotification");
    }
  },
  connectServer({ state, rootState }) {
    console.log("connect to Notification server");
    const url = rootState.Setting.url;
    return new Promise((resolve, reject) => {
      let token = rootState.Auth.token;
      if (!window.Echo && token.token_type != null) {
        console.log("token for Notification broadcast");
        console.log(token);
        window.Echo = new Echo({
          //broadcaster: "socket.io",
          broadcaster: "pusher",
          key: "c59b9918ea05165dbe03",
          //host: "http://localhost:8000",
          authEndpoint: url + "/broadcasting/auth",
          cluster: "ap1",
          forceTLS: true,
          auth: {
            headers: {
              Authorization: `${token.token_type} ${token.access_token}`
            }
          }
        });
      } else {
        console.log("token kosong");
      }
      resolve(window.Echo);

      // Vue.prototype.$connect(token).then(res=>{
      //   resolve()
      // }).catch((err)=>{
      //   reject(err)
      // })
    });
  },
  subscribeNotification({ commit, rootState }) {
    //console.log(this.state.Auth)
    if (rootState.Auth.auth.id && window.Echo) {
      // let channel = "App.Models.User." + this.state.Auth.auth.id;
      let channel = "notification." + this.state.Auth.auth.id;
      console.log("Subscribing to notification channel: " + channel);
      //console.log(Vue.prototype.$echo)
      const events = ["LikedPostEvent", "LikedCommentEvent", "CommentedPostEvent","AlsoCommentedPostEvent"];
      window.Echo.private(channel).listen(events[0], notification => {
        console.log(notification.data);
        notification.type = events[0];
        commit("addNotification", notification);
      }).listen(events[1], notification=>{
        console.log(notification.data);
        notification.type = events[1];
        commit("addNotification", notification);
      }).listen(events[2], notification=>{
        console.log(notification.data);
        notification.type = events[2];
        commit("addNotification", notification);
      }).listen(events[3], notification=>{
        console.log(notification.data);
        notification.type = events[3];
        commit("addNotification", notification);
      });
    } else {
      console.log("user belum login atau belum connect ke server broadcast");
    }
  }
}

export default actions
