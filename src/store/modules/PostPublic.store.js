/* Module1.store.js */
import axios from 'axios'
// State object
const state = {

}

// Mutations
const mutations = {

}

// Actions
const actions = {
    store({ commit }, postId) {
        return new Promise((resolve, reject) => {
            let access = {
                is_public: true
            }
            axios.post(`${this.state.Setting.url}/api/v1/publicpost/${postId}`, access).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    destroy({ commit }, postId) {
        return new Promise((resolve, reject) => {
            let access = {
                is_public: false
            }
            axios.post(`${this.state.Setting.url}/api/v1/publicpost/${postId}`, access).then(res => {
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