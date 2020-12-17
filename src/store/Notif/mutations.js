
const mutation = {
  add(state, payload) {
    state.notifications.push({
        id: 2,
        senderId: 1,
        postId: 2974,
        text: "Assalamualaikum",
        created_at: "02-02-2020"
    });
}
}

export default mutation
