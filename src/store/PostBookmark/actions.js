import axios from 'axios'

const actions = {
  store({ commit }, postId) {
    return new Promise((resolve, reject) => {
      let access = {
        post_id: postId
      }
      axios.post(`${this.state.Setting.url}/api/v1/postbookmark`, access).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  destroy({ commit }, postId) {
    return new Promise((resolve, reject) => {
      let access = {
        _method: 'delete'
      }
      axios.post(`${this.state.Setting.url}/api/v1/postbookmark/${postId}`, access).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default actions
