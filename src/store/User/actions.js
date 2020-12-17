import axios from "axios";

const actions = {
  test({commit},payload){
    console.log(payload);
  },
  search({ commit }, key) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.state.Setting.url}/api/v1/users/search/${key}`)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
},
next({ commit, state }, url) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${url}`)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
},
show({ commit }, userId) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.state.Setting.url}/api/v1/user/${userId}`).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
}

export default actions
