/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-03-16 10:55:20
 * @LastEditTime: 2020-04-10 10:32:32
 */
const api = {
	production: {
		bnq365: `${window.location.protocol}//drm.bnq.com.cn/drmService`,
	},
	development: {
		bnq365: `${window.location.protocol}//drm-dev.bnq.com.cn/drmService`,
	},
	test: {
		bnq365: `${window.location.protocol}//drm-test.bnq.com.cn/drmService`,
	}
}
const URL = api[process.env.NODE_ENV]['bnq365']
//获取share页面产品列表
let getProductList = URL + '/config/getProductList'
//获取赠送列表
let getGiveOrderlist = URL + '/appApi/giveOrder/list'
//退款
let refund = URL + '/appApi/giveOrder/refund'
//取消赠送
let cancleGive = URL + '/appApi/giveOrder/cancelGive'
console.log('getProductList',getProductList)

let getCardStatus = URL + '/appApi/giveOrder/detail'
// 获取体验卡日期信息
let getCardInfo = URL + '/config/freeInfo'
// 获取地区信息
let getAreaOptions = URL + '/appApi/serviceArea/getAllAreas'
// 获取省信息
let getLiveHomeProvinces = URL + '/appApi/serviceArea/provinces'
// 获取市信息
let getLiveHomeCities = URL + '/appApi/serviceArea/cities'
// 获取区信息
let getLiveHomeDistricts = URL + '/appApi/serviceArea/districts'
// 获取街道信息
let getLiveHomeStreets = URL + '/appApi/serviceArea/streets'
// 免费领取体验卡
let getCardFee = URL + '/appApi/drmCard/claimFreeCard'
// 领取体验卡之前的校验
let getCardExamine = URL + '/appApi/drmCard/claimCheck'
export {
	getProductList,
	getGiveOrderlist,
	refund,
	cancleGive,
	getCardStatus,
	getAreaOptions,
	getCardInfo,
	getCardFee,
	getLiveHomeProvinces,
	getLiveHomeCities,
	getLiveHomeDistricts,
    getLiveHomeStreets,
    getCardExamine
}