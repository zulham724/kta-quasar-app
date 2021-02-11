const mutation = {
  setTotalMemberEachRegion(state, payload) {
    state.count = {...state.count, ...payload.totalMember };
  },
  setTotalUser(state, payload) {
      state.count = {...state.count, user_total: payload.user_total };
  },
  setIsQuestionnary(state) {
      state.isQuestionnary = !state.isQuestionnary;
      console.log('matamu')
  },
  SOCKET_test(state){
    alert('socket.io gan');
  },
  SOCKET_CONNECT(state) {
    alert('socket.io gan');
  }
}

export default mutation
