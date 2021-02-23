import Vue from "vue";

Vue.prototype.$devLogger = function(...args){
  if(process.env.DEV)console.log(...args);
}