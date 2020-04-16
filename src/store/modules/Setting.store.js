/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    url: 'http://localhost:8000',
    storageUrl: 'https://S3.wasabisys.com/agpaiidigital.org',
    // url: 'https://agpaiidigital.org',
    // storageUrl: 'http://localhost:8000/storage',
    assets: {
        bgToolbar: 'statics/bg-toolbar.jpeg'
    }
}

// Mutations
const mutations = {

}

// Actions
const actions = {

}

// Getter functions
const getters = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}