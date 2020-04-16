import Vue from 'vue'
import axios from 'axios'
import store from './../store'

Vue.prototype.$axios = axios
Vue.prototype.$http = axios
const token = store().getters['Auth/token']
if (token) {
    Vue.prototype.$http.defaults.headers.common.Accept = 'application/json'
    Vue.prototype.$http.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`
}