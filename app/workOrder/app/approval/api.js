/*------费用审批开始-------*/
//获取费用类别
let getApplyType =  '/dictionary/getApplyType'
//获取费用子类
let getSubApplyType = '/dictionary/getSubApplyType'
//获取门店和城市
let getShopListAndCity =  '/dictionary/getShopListAndCity'
//新增审批
let addApproval =   '/expenseAudit/add'
//申请人列表
let getApplyList =   '/expenseAudit/applyList'
//审批人列表
// let getAuditList =   '/expenseAudit/auditList'
let getApplyDetail = '/expenseAudit/detail'

let passApply = '/expenseAudit/pass'

let refundApply = '/expenseAudit/reject'

//获取门店预算
let buggetInfo = '/budgetSurplus/info'
/*------费用审批结束-------*/
export {
	getApplyType,
	getSubApplyType,
	getShopListAndCity,
	addApproval,
	getApplyList,
	getApplyDetail,
	passApply,
	refundApply,
	buggetInfo
}