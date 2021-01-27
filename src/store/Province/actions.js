import axios from 'axios'

const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.Setting.url}/api/v1/province`).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default actions