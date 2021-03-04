import Vue from 'vue'
const audio = require('../assets/sounds/notification.mp3');
const audio2 = require('../assets/sounds/blob-chat.mp3');
Vue.prototype.$notificationSound = new Audio(audio);
Vue.prototype.$chatSound = new Audio(audio2);
