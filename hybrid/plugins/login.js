import { postToApp } from '../hybrid'
function RNLogin(param) {
  postToApp('User', 'isLogin', param, 'User', 'isLogin')
}
module.exports = { RNLogin }