import store from "./../store";
import jwt from "jsonwebtoken";
import Vue from "vue";
import VueSocketIO from "vue-socket.io";

const auth = store().getters["Auth/auth"];
if (typeof auth == "object") {
  console.log('socket boot', Vue.prototype)
  store().dispatch("SocketIO/connect").then(res=>{
    console.log('token chat:',res.token)
  });
  // const socketUrl = store().getters["Setting/socketUrl"];
  // const client_secret = store().getters["Auth/client_secret"];
  // const payload = {
  //   sub:auth.id
  // };
  // const token = jwt.sign(payload,client_secret);
  // console.log
  // Vue.use(
  //   new VueSocketIO({
  //     debug: true,
  //     connection: socketUrl,
  //     // vuex: {
  //     //     store_f,
  //     //     actionPrefix: 'SOCKET_',
  //     //     mutationPrefix: 'SOCKET_'
  //     // },
  //     options: {
  //       query: `token=${token}`
  //     } //Optional options
  //   })
  // );

  // store().dispatch("SocketIO/connect").then(res=>{
  //   console.log('token chat: ',res.token);
  // });
}
//
