import axios from "axios";

const actions = {
  getDetailTotalMember({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/getDetailTotalMember`)
        .then(res => {
          commit("setTotalMemberEachRegion", { totalMember: res.data });
        });
    });
  },
  getCountUser({ commit }) {
    axios.get(`${this.state.Setting.url}/api/v1/users/count`).then(res => {
      commit("setTotalUser", { user_total: res.data });
    });
  },
  index({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.Setting.url}/api/v1/settings`).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setIsQuestionnary({ commit }) {
    commit("setIsQuestionnary")
  },
  getContactNumber() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/getcontactnumber`)
        .then(res => {
          resolve(res.data);
        });
    });
  }
}

export default actions
