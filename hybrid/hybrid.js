function postToApp (className, func, param, cbclassname,cbfunction) {
  var messages = {
      className: className,
      func: func,
      param: param,
      callback: {
          className: cbclassname,
          func: cbfunction
      }
  }
  var msg = JSON.stringify(messages)
  return window.postMessage(msg,'*')
}
function getMessage () {
  document.addEventListener('message', function(e) {
      var data = JSON.parse(e.data)
      if(data.code == 0){
          window[data.data.className][data.data.func](data.data.param)
      }else if(!!data.message){
        alert(data.message)
      }
  });
}
module.exports = { postToApp, getMessage }