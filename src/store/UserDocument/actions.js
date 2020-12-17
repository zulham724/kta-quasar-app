import axios from "axios";

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

export default actions
