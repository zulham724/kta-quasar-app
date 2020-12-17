import axios from 'axios'

const actions= {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      // return console.log(this.state.Auth.auth)
      axios.get(`${this.state.Setting.url}/api/v1/educationallevel/${this.state.Auth.auth.profile.educational_level_id}`).then(res => {
        commit('setGrades', { grades: res.data.grades })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default actions
