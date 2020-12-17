import axios from 'axios'

const actions = {
  byProvinceId({ commit }, provinceId) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.state.Setting.url}/api/v1/province/${provinceId}`).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
},
}

export default actions
