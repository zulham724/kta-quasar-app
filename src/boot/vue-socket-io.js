import store from "./../store";
import Vue from "vue";
import VueSocketIO from "vue-socket.io";

console.log('socket boot', Vue.prototype);
const client_secret  = store().getters['Auth/client_secret'];
const auth  = store().getters['Auth/auth'];
const socketUrl = store().getters['Setting/socketUrl'];

let user_id = -1;
let token='';
if(auth){
  //jika ada Auth, maka buat token JWT untuk authentication socket.io
  user_id = auth.id;
  const payload = {
    sub:user_id
  }
  token = store().getters["Auth/token"].access_token;
}

if(Vue.prototype.$socket){
  Vue.prototype.$socket.disconnect();
  Vue.prototype.$devLogger('disconnect socket.io');

}


Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socketUrl,
    // vuex: {
    //     store_f,
    //     actionPrefix: 'SOCKET_',
    //     mutationPrefix: 'SOCKET_'
    // },
    options: {
      query: `token=${token}`,
      forceNew : true,
    } //Optional options
  })
);

