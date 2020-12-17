import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import createLogger from 'vuex/dist/logger'

import example from "./module-example";
import Ad from "./Ad";
import Auth from "./Auth";
import Book from "./Book";
import BookCategory from "./BookCategory";
import City from "./City";
import Comment from "./Comment";
import DailyPrayer from "./DailyPrayer";
import District from "./District";
import EchoNotification from "./EchoNotification";
import EducationalLevel from "./EducationalLevel";
import Event from "./Event";
import File from "./File";
import Grade from "./Grade";
import Murottal from "./Murottal";
import MusicPlayer from "./MusicPlayer";
import Notif from "./Notif";
import Payment from "./Payment";
import Post from "./Post";
import PostBookmark from "./PostBookmark";
import PostComment from "./PostComment";
import PostPublic from "./PostPublic";
import Province from "./Province";
import Questionnary from "./Questionnary";
import SampleModule from "./SampleModule";
import Setting from "./Setting";
import User from "./User";
import UserDocument from "./UserDocument";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const debug = process.env.DEV

const dataState = createPersistedState({
  paths: ['Auth', 'Setting']
})



export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      Ad,
      Auth,
      Book,
      BookCategory,
      City,
      Comment,
      DailyPrayer,
      District,
      EchoNotification,
      EducationalLevel,
      Event,
      File,
      Grade,
      Murottal,
      MusicPlayer,
      Notif,
      Payment,
      Post,
      PostBookmark,
      PostComment,
      PostPublic,
      Province,
      Questionnary,
      SampleModule,
      Setting,
      User,
      UserDocument
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: debug,
    // state: {},
    // mutations: {
    //       RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
    // },
    plugins: debug ? [createLogger(), dataState] : [dataState] 
    // plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin] // set logger only for development
  });

  return Store;
}
