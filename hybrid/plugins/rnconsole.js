import { postToApp } from '../hybrid'
// getMessage()
function RNConsole(param){
  postToApp('Console','log',param,'Console','log')
}
window.Console = {
  log: function(e){
      console.log('hybrid===',e)
  }
}
module.exports = { RNConsole }