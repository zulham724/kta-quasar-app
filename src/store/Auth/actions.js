
import axios from "axios";

const actions = {
  login({ commit,dispatch }, credential) {
    return new Promise((resolve, reject) => {
      const access = {
        grant_type: "password",
        client_id: this.state.Auth.client_id,
        client_secret: this.state.Auth.client_secret,
        ...credential
      };
      axios
        .post(`${this.state.Setting.url}/oauth/token`, access)
        .then(resp => {
          const token = resp.data;
          axios.defaults.headers.common.Accept = "application/json";
          axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
          axios
            .get(`${this.state.Setting.url}/api/user`)
            .then(res => {
              const auth = res.data;
              // Add the following line:
              const payload = {
                token: token,
                auth: auth
              };
              commit("auth_success", payload);
              console.log('connect to socket.io after login');
              dispatch("SocketIO/connect",{},{root:true});
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
          localStorage.clear();
        });
    });
  },
  register({ commit }, credential) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.state.Setting.url}/api/register`, credential)
        .then(resp => {
          const token = resp.data;
          axios.defaults.headers.common.Accept = "application/json";
          axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
          axios
            .get(`${this.state.Setting.url}/api/user`)
            .then(res => {
              const auth = res.data;
              const payload = {
                token: token,
                auth: auth
              };
              commit("auth_success", payload);
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          localStorage.clear();
          reject(err);
        });
    });
  },
  logout({ commit,dispatch, state }) {
    return new Promise((resolve, reject) => {
      const user_id = state.auth.id;
      const channel = 'notification.' + user_id;
      console.log('leaving channel: ' + channel);
      if (window.Echo) {
        window.Echo.leave(channel);
        window.Echo = null;
      }
      // dispatch("SocketIO/disconnect",{},{root:true});
      commit("logout");
      commit("EchoNotification/deleteItems", null, { root: true });
      // console.log(rootState.EchoNotification.items)
      delete axios.defaults.headers.common.Authorization;
      resolve();
    });
  },
  getAuth({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/user`)
        .then(res => {
          const auth = res.data;
          const payload = {
            auth: auth
          };
          commit("setAuth", payload);
          resolve(res);
        })
        .catch(err => {
          // alert(err.response.status)

          reject(err);
        });
    });
  },
  getPaymentStatus() {
    return new Promise((resolve, reject) => {

      axios
        .get(`${this.state.Setting.url}/api/v1/payments/getstatus/${this.state.Auth.auth.id}`)
        .then(res => {
          //  const auth = res.data;
          //  const payload = {
          //      auth: auth
          //  };
          //  commit("setAuth", payload);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateProfile({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      const access = {
        _method: "put",
        ...user
      };
      axios
        .post(
          `${this.state.Setting.url}/api/v1/user/${this.state.Auth.auth.id}`,
          access
        )
        .then(res => {
          // commit("setProfile", { profile: res.data.profile });
          dispatch('getAuth')
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default actions
