const api = {
	production: {
		market: `${window.location.protocol}//yingxiao.bnq.com.cn/marketing-service`,
	},
	development: {
		market: `${window.location.protocol}//yingxiao-test.bnq.com.cn/marketing-service`,
	}
}

//获取share页面产品列表
let getInitData =  api[process.env.NODE_ENV]['market'] + '/cattle-maker/record/initCondition.do'

export {
	getInitData,
}