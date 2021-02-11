const getters = {
  isLoggedIn: state => !!state.token.access_token,
  isUnAuthorized: state=>state.is_unauthorized,
  auth: state => state.auth,
  token: state => state.token,
  client_secret: state => state.client_secret,
}

export default getters
