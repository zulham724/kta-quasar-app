const mutation = {
  play(state, payload) {
    if (state.item && state.item.audio) {
      state.item.audio.pause()
    }
    state.item = { ...payload.item, audio: new Audio(`${this.state.Setting.storageUrl}/${payload.item.file.src.download_link}`) }
    state.item.audio.play()
    state.isPlay = true
  },
  pause(state, payload) {
    state.isPlay = false
    state.item.audio.pause()
  },
  resume(state, payload) {
    state.isPlay = true
    state.item.audio.play()
  },
  close(state) {
    state.isPlay = false
    state.item.audio.pause()
    state.item = null
  }
}

export default mutation
