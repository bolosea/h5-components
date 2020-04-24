import { postToApp } from '../hybrid'
function InitNav(param) {
  postToApp('Navigation', 'initNavigation', param, '', '')
}
module.exports = { InitNav }