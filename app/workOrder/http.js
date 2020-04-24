import axios from 'axios'
import { getLoginUrl } from "@util/index";
import Toast from "@/prompt/toast";
import { url } from './url'

let http = axios.create({
	headers: {
		'Cache-Control': 'no-cache'
	}
})

http.interceptors.request.use((config)=>{
	config.baseURL = url[process.env.NODE_ENV]['iwork']
	config.withCredentials = true
	return config
})

http.interceptors.response.use((res)=>{
	let {data,data:{code,msg},headers} = res
		switch (code) {
			case -1 :
				return window.location.href = getLoginUrl()
			case 1:
				return msg && Toast.show(msg)
			case 2:
				return msg && Toast.show(msg)
			default:
				break
	}
	return Object.keys(data.result.data).length ? data.result.data: null
},(error)=>{
	return Promise.reject(error)
})

export default http