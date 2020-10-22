const getters = {
  token: state => state.user.token,
  info: state => state.user.info,
  language: state => state.app.language
}
export default getters
