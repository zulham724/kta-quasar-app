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
  }
}

export default mutation
