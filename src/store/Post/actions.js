import axios from "axios";

const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/post`)
        .then(res => {
          commit("set", { posts: res.data });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  store({ commit }, access) {
    return new Promise((resolve, reject) => {
      // console.log(access)
      axios
        .post(`${this.state.Setting.url}/api/v1/post`, access, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          commit("add", { post: res.data });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  show({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/post/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let access = {
        _method: 'put',
        ...payload
      }
      axios.post(`${this.state.Setting.url}/api/v1/post/${payload.id}`, access).then(res => {
        commit('update', res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  next({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${state.posts.next_page_url}`)
        .then(res => {
          commit("next", { posts: res.data });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  prev() { },
  page() { },
  destroy({ commit }, id) {
    return new Promise((resolve, reject) => {
      let access = {
        _method: "delete"
      };
      axios
        .post(`${this.state.Setting.url}/api/v1/post/${id}`, access)
        .then(res => {
          commit("remove", { id: id });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  like({ commit }, id) {
    return new Promise((resolve, reject) => {
      const access = {
        post_id: id
      };
      axios
        .post(`${this.state.Setting.url}/api/v1/postlike`, access)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  dislike({ commit }, id) {
    return new Promise((resolve, reject) => {
      const access = {
        _method: "delete"
      };
      axios
        .post(`${this.state.Setting.url}/api/v1/postlike/${id}`, access)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default actions
