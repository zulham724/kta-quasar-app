/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    items:[]
}

// Mutations
const mutations = {
    set(state, payload){
        const index = state.items.findIndex(e => e.user.id ==payload.user.id);
        if(index>-1)state.items[index].documents=payload.documents;
        else state.items.push(payload)
        //console.log(state.items)
    },
    addDocuments(state, payload){
        const index=state.items.findIndex(e=>e.user.id==payload.user.id);
        if(index>-1){
            const previousDocuments=state.items[index].documents.data;
            state.items[index].documents = payload.documents;
            state.items[index].documents.data=[...previousDocuments,...payload.documents.data];
            // payload.documents.data.forEach(document=>{
            //     const document_index=state.items[index].documents.data.findIndex(e=>e.id==document.id);
            //     if(document_index==-1){
            //        state.items[index].documents.data.push(document);
            //     }
            // });
           
            
        }
    },
    
}

// Actions
const actions = {
    
    show({ commit }, districtId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/user/${districtId}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    index({commit}, userid){
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/user/${userid}/document`).then(res => {
                //console.log(res.data.documents);
                commit("set", res.data)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    next({commit}, payload){
        return new Promise((resolve, reject)=>{
            axios.get(payload.next_page_url).then(res=>{
                commit("addDocuments",res.data);
                resolve();
            });
            //resolve();
        });
        
    },
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