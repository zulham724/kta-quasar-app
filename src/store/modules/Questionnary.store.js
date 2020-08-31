/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    items:[],
    step:1,
}

// Mutations
const mutations = {
    set(state, payload){
        //state.items = [...payload]
        payload.forEach(v=>{
            v.question_lists.forEach(v2=>{
                v2.answer_id = null
            })
            //state.items.push({...v})
        })
        state.items = [...payload]
        console.log(state.items)
    },
    update(state, payload){
        let index=state.items[0].question_lists.findIndex(e=>e.id==payload.question_list_id);
        if(index>-1)state.items[0].question_lists[index].answer_id=payload.answer_id;
    }
}

// Actions
const actions = {
    getActive({commit}) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/questionnaries/getactive`).then(res => {
                //commit('set',res.data)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    update({commit}, payload){
        return new Promise((resolve, reject)=>{
            commit("update", payload)
            console.log(payload)
            resolve()
        })
    },
    submit({state}, payload){
       
        return new Promise((resolve, reject)=>{
            // console.log(payload);
            // resolve();
            axios.post(`${this.state.Setting.url}/api/v1/questionnarysesion`, payload).then(res => {
                //commit('set',res.data)
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
