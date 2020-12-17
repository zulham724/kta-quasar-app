import axios from 'axios'

const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      // console.log('asd')
      axios
        .get(`${this.state.Setting.url}/api/v1/bookcategory`)
        .then(res => {
          commit("set", { bookcategories: res.data });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
}

export default actions
