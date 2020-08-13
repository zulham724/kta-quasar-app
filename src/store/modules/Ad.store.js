/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    items: []
}

// Mutations
const mutations = {

}

// Actions
const actions = {
    getActive() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/ads/getactive`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
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
