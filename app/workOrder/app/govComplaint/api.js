//投诉列表
const getComplaintList = '/complain/queryList'
//政府抽查单列表
const getGovComplaintList =  '/gov/queryList'
//政府抽查处理状态
const getNodeStatus = '/gov/getNodeStatus'
//门店列表
const getShopList = '/dictionary/getShopListAll'

//根据投诉id获取详情
const getComplaintDetail = '/complain/queryDetail'
//根据抽查id获取详情
const getGovComplaintDetail = '/gov/queryDetail'
//根据sku获取商品信息
const getProductInfoBySku = '/dictionary/getProductInfo'
//保存详情
const saveComplainDetail = '/complain/saveComplainDetail'
//获取投诉类型
const getComplainType = 'dictionary/getComplainSource'

//获取投诉子类型
const getSubComplainType = 'dictionary/getSubComplainSource'
//合同属性
const getContractProperty = '/complain/getContractProperty'

//回访
const returnVisit = '/complain/returnVisit'

//关闭工单
const closeComplaint = '/complain/handleClose'

const govCloseComplaint = '/gov/handleClose'

//设置取消非理性投诉
const setRationalComplaint = '/complain/setRationalComplaint'

// 处理完成
const handleOver = '/complain/handleOver'

// 获取顾客类型
const getCustomerType = `complain/getCustomerType`

// 获取升级状态
const getUpgradeStatus = `dictionary/getUpgradeStatus`

//投诉来源
const getComplaintSource = '/complain/getComplainSource'

const addComplaintLog = '/gov/addContent'

export {
  getComplaintList,
  getNodeStatus,
  getShopList,
  getComplaintDetail,
  getProductInfoBySku,
  saveComplainDetail,
  getComplainType,
  getSubComplainType,
  getContractProperty,
  returnVisit,
  closeComplaint,
  setRationalComplaint,
  handleOver,
  getCustomerType,
  getUpgradeStatus,
  getComplaintSource,
  getGovComplaintList,
  getGovComplaintDetail,
  govCloseComplaint,
  addComplaintLog
}