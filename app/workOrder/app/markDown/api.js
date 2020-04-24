/*------费用审批开始-------*/ 
//获取费用类别
let getApplyType =  '/dictionary/getApplyType'
//获取费用子类
let getSubApplyType = '/dictionary/getSubApplyType'
//获取门店和城市
let getShopListAndCity =  '/dictionary/getShopListAndCity'

//新增审批
let addApproval =   '/expenseAudit/add'

let passApply = '/expenseAudit/pass'

let refundApply = '/expenseAudit/reject'

//获取门店预算
let buggetInfo = '/budgetSurplus/info'


/*-------markdown审批开始-----*/
//获取申请人（审批人）类表
let getApplyList = 'markdown/applyList';
//获取工单状态
// const getUpgradeStatus = `dictionary/getUpgradeStatus`；
//门店列表
// const getShopList = '/dictionary/getShopListAll'

//详情页
let getApplyDetail = 'markdown/detail';
//申请人更新
let applyUpdate = 'markdown/update';
//做更新的时候  输入申请折让金额  返回折后总金额 折后前台毛利率的接口
let applyAmountCal = 'markdown/applyAmountCal'
//申请类型
let applyType = 'markdown/applyType';

//CM审核
let applyCmAudit = 'markdown/cmAudit'; 
let supplyAmountCal = 'markdown/supplyAmountCal'
//CM审核后的审批
let processAudit = '/markdown/processAudit'



/*------费用审批结束-------*/
export {
	getApplyType,
	getSubApplyType,
	getShopListAndCity,
	addApproval,
		getApplyList,
		getApplyDetail,
		applyUpdate,
		applyCmAudit,
		processAudit,
		applyType,
		supplyAmountCal,
		applyAmountCal,
	passApply,
	refundApply,
	buggetInfo
}