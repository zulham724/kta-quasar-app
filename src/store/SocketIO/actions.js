import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import jwt from "jsonwebtoken";
import store from "../index";

const actions = {
  connect({ commit, dispatch, rootState }) {
  

    const client_secret = this.state.Auth.client_secret;
    const user_id = this.state.Auth.auth.id;
    const payload = {
      sub: user_id
    };

    // const store_f = store();
    // console.log('store_f',store._actions);
    // const token =   rootGetters["Auth/token"];
  
    const token = rootState.Auth.token.access_token;
    const socketUrl = this.state.Setting.socketUrl;

    if (Vue.prototype.$socket) {
      // console.log("disconnect", Vue.prototype.$socket.disconnect());
      Vue.prototype.$socket.query = `token=${token}`;
      console.log("new token for socket.io",token);
      console.log('VueSocketIo.connect()');
      Vue.prototype.$vueSocketIo.io = Vue.prototype.$vueSocketIo.connect(socketUrl, {
        query: `token=${token}`,
        forceNew : true,
      });
      Vue.prototype.$socket = Vue.prototype.$vueSocketIo.listener.io = Vue.prototype.$vueSocketIo.io;
      Vue.prototype.$vueSocketIo.listener.register();
    }
    
  },
  SOCKET_test() {
    alert("socket.io action gan");
  },
  disconnect() {
    this._vm.$devLogger("disconnect socket.io");
    Vue.prototype.$socket.disconnect();
  }
};

export default actions;
