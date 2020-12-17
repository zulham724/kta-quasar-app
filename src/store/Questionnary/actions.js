import axios from "axios";

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

export default actions
