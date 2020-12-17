import axios from "axios";

const actions = {
  store({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const access = {
        post_id: payload.post_id,
        user_id: payload.user_id,
        value: payload.value
      };
      axios
        .post(`${this.state.Setting.url}/api/v1/postcomment`, access)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  destroy() { },
  like({ commit }, commentId) {
    return new Promise((resolve, reject) => {
      const access = {
        comment_id: commentId
      };
      axios
        .post(`${this.state.Setting.url}/api/v1/commentlike`, access)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  dislike({ commit }, commentId) {
    return new Promise((resolve, reject) => {
      const access = {
        _method: `delete`
      };
      axios
        .post(`${this.state.Setting.url}/api/v1/commentlike/${commentId}`, access)
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
