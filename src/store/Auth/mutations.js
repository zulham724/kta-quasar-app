const mutation = {
  auth_success(state, payload) {
    state.token = payload.token;
    state.auth = payload.auth;
    state.is_unauthorized = false;
  },
  setAuth(state, payload) {
      state.auth = payload.auth;
  },
  setAuth_user_activated_at(state, user_activated_at){
      state.auth.user_activated_at = user_activated_at
  },
  logout(state) {
      state.token = {};
      state.auth = "";

  },
  setProfile(state, payload) {
      state.auth = {
          ...state.auth,
          profile: payload.profile
      }
  },
  addPayment(state, payment){
      const index=state.auth.payments.findIndex(e=>e.id==payment.id);
      if(index>-1){
          state.auth.payments[index] = {...payment}
      }else{
          state.auth.payments.push({
              ...payment
          })
      }
      
  },
  setUnauthorized(state, is_unauthorized){
      state.is_unauthorized=is_unauthorized;
  }
}

export default mutation
