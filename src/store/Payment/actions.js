import axios from 'axios'

const actions = {
  getPaymentUrl({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.state.Setting.url}/api/v1/payment/paymentUrl`).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getDetailPayments({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.Setting.url}/api/v1/payments/bymonthyear`).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getPaymentProvinces({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.Setting.url}/api/v1/payments/bymonthyear/${payload.month}/${payload.year}`).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getPaymentCities({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.Setting.url}/api/v1/payments/bymonthyear/city/${payload.province_id}/${payload.month}/${payload.year}`).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getPaymentCityUsers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.Setting.url}/api/v1/payments/bymonthyear/cityusers/${payload.city_id}/${payload.month}/${payload.year}`).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default actions