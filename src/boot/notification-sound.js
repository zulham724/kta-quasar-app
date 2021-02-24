import Vue from 'vue'
const audio = require('../assets/sounds/notification.mp3');
Vue.prototype.$notificationSound = new Audio(audio);
