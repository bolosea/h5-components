// 默认2秒消失
let Toast = {}
Toast.show = (msg, duration = 2000) => {
	let m = document.createElement('div')
	let s = document.createElement('div')
	m.style.cssText = 'width:4.4rem;height:.88rem;margin-left:-2.2rem;position:fixed;left:0;right:0;bottom:0;top:0;margin:auto;'
	s.innerHTML = msg
	s.style.cssText = 'font-size: .28rem; min-width: 1em; opacity: 0.6; color: rgb(255, 255, 255); line-height: .88rem; text-align: center; border-radius: 0.32rem; z-index: 999999; font-weight: bold; margin: 0px auto; background-color: black;'
	m.appendChild(s)
	document.body.appendChild(m)
	setTimeout(() => {
		let d = 0.5
		m.style.webkitTransition = `-webkit-transform ${d}s ease-in, opacity ${d}s ease-in`
		m.style.opacity = '0'
		setTimeout(() => {
			document.body.removeChild(m)
		}, d * 1000)
	}, duration)
}

export default Toast