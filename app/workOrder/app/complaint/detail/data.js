import React from 'react'
import Add from '@workOrder/imgs/add@3x.png'
import {getUrlArg} from '@util'

export const baseData = [
	{
		id: 'shopName',
		name: '所属门店'
	},
	{
		id: 'customerTypeName',
		name: '分配处理人'
	},
	// {
	// 	id: 'upgradeStatusName',
	// 	name: '升级状态'
	// },
	{
		id: 'customerName',
		name: '顾客姓名',
		// joinData: {
		//   type: 'mobile',
		//   id: 'customerMobile'
		// }
	},
	{
		id: 'customerMobilee',
		name: '顾客手机号',
		joinData: {
			type: 'mobile',
			id: 'customerMobile'
		}
	},
	{
		id: 'customerSexName',
		name: '顾客性别'
},
	// {
	// 	id: 'taskListStatus',
	// 	name: '任务清单'
	// },
	{
		id: 'complainSourceName',
		name: '投诉来源'
	},
	{
		id: 'ifRationalComplaintName',
		name: '是否理性投诉'
	},
	{
		id: 'customerComplainContent',
		name: '投诉事件'
	},
	{
		id: 'customerAsk',
		name: '顾客要求'
	},
	{
		id: 'file',
		name: '附件'
	}
]

// export const detailData = [
// 	{
// 		id: 'complainTypeName',
// 		name: '投诉分类'
// 	},
// 	{
// 		id: 'subComplainTypeName',
// 		name: '投诉子类'
// 	},
// 	{
// 		id: 'concreteProblemsName',
// 		name: '具体问题',
// 		underline: true,
// 		// joinData: {
// 		//   type: 'custom',
// 		//   content: <p onClick={()=>{
// 		//     window.location.href = `./addComplaintDetail`
// 		//   }} className='fill-detail'>
// 		//     <img src={Add} alt="add"/>
// 		//     <span>完善详情</span>
// 		//   </p>
// 		// }
// 	},
// 	{
// 		id: 'ifPurchaseName',
// 		name: '是否购买'
// 	},
// 	{
// 		id: 'contractNumber',
// 		name: '合同编号'
// 	},
// 	{
// 		id: 'contractProperty',
// 		name: '合同属性'
// 	},
// 	{
// 		id: 'renovationAddress',
// 		name: '装修地址'
// 	},
// 	{
// 		id: 'constructionLeader',
// 		name: '施工队长'
// 	},
// 	{
// 		id: 'projectManager',
// 		name: '工程管理员'
// 	},
// 	{
// 		id: 'designer',
// 		name: '设计师'
// 	},
// 	{
// 		id: 'budgetOfficer',
// 		name: '预算员',
// 		underline: true
// 	},
// 	{
// 		id: 'ifInvolveProductComplain',
// 		name: '涉及商品投诉'
// 	},
// 	{
// 		id: 'sapSkuCode',
// 		name: '商品sku'
// 	},
// 	{
// 		id: 'productBrand',
// 		name: '商品品牌'
// 	},
// 	{
// 		id: 'productName',
// 		name: '商品名称'
// 	},
// 	// {
// 	//   id: 'productClassOneName',
// 	//   name: '商品一级分类'
// 	// },
// 	// {
// 	//   id: 'productClassTwoName',
// 	//   name: '商品二级分类'
// 	// },
// 	// {
// 	//   id: 'productClassThreeName',
// 	//   name: '商品三级分类'
// 	// },
// 	// {
// 	//   id: 'productClassFourName',
// 	//   name: '商品四级分类'
// 	// },
//
// 	{
// 		id: 'ifWarrantyPeriod',
// 		name: '是否保修期内'
// 	},
// ]
export const handleData = [
	{
		id: 'handleProgramme',
		name: '处理结果',
		type: 'textarea',
		required: true
	}
]

export const closeData = [
	{
		id: 'ifRepeatOrder',
		name: '是否重复工单',
		type: 'switch',
		initialValue: 0,
	},
	{
		id: 'repeatOrderCode',
		name: '重复工单号',
		hide: true
	}
]

export const detailData = {
	1: [
		{
			id: 'complainTypeName',
			name: '投诉类型'
		},
		{
			id: 'subComplainTypeName',
			name: '投诉子类型'
		},
		{
			id: 'concreteProblemsName',
			name: '具体问题'
		},
		{
			id: 'ifPurchaseName',
			name: '是否购买',
			isSub: true
		}, {
			id: 'contractNumber',
			name: '合同编号'
		},
		{
			id: 'contractPropertyName',
			name: '合同属性'
		},
		{
			id: 'renovationAddress',
			name: '装修地址'
		},
		{
			id: 'constructionLeader',
			name: '施工队长'
		},
		{
			id: 'projectManager',
			name: '工程管理员'
		},
		{
			id: 'designer',
			name: '设计师'
		},
		{
			id: 'budgetOfficer',
			name: '预算员'
		},
		{
			id: 'ifInvolveProductComplainName',
			name: '是否涉及商品投诉',
			isSub: true
		},
		{
			id: 'sapSkuCode',
			name: '商品SKU'
		},
		// {
		// 	id: 'skuStatus',
		// 	name: '商品状态'
		// },
		// {
		// 	id: 'skuClassName',
		// 	name: '商品品类'
		// },
		// {
		// 	id: 'sapSkuCode',
		// 	name: '商品编码'
		// },
		{
			id: 'productBrand',
			name: '商品品牌'
		},
		{
			id: 'productName',
			name: '商品名称'
		},
		{
			id: 'productClassOneName',
			name: '商品一级分类'
		},
		{
			id: 'productClassTwoName',
			name: '商品二级分类'
		},
		{
			id: 'productClassThreeName',
			name: '商品三级分类'
		},
		{
			id: 'productClassFourName',
			name: '商品四级分类'
		},
		{
			id: 'ifWarrantyPeriodName',
			name: '是否保修期内'
		}
	],
	2: [
		{
			id: 'complainTypeName',
			name: '投诉类型'
		},
		{
			id: 'subComplainTypeName',
			name: '投诉子类型'
		},
		{
			id: 'concreteProblemsName',
			name: '具体问题'
		},
		{
			id: 'ifPurchaseName',
			name: '是否购买',
			isSub: true
		},
		{
			id: 'purchaseDate',
			name: '购买日期'
		},
		{
			id: 'sellOrderCode',
			name: '销售单号'
		}, {
			id: 'sapSkuCode',
			name: '商品SKU'
		}, {
			id: 'productBrand',
			name: '商品品牌'
		},
		{
			id: 'productName',
			name: '商品名称'
		},
		{
			id: 'productClassOneName',
			name: '商品一级分类'
		},
		{
			id: 'productClassTwoName',
			name: '商品二级分类'
		},
		{
			id: 'productClassThreeName',
			name: '商品三级分类'
		},
		{
			id: 'productClassFourName',
			name: '商品四级分类'
		}, {
			id: 'ifWarrantyPeriodName',
			name: '是否保修期内',
		},
	],
	3: [
		{
			id: 'complainTypeName',
			name: '投诉类型'
		},
		{
			id: 'subComplainTypeName',
			name: '投诉子类型'
		},
		{
			id: 'concreteProblemsName',
			name: '具体问题'
		},
		{
			id: 'ifPurchaseName',
			name: '是否购买',
			isSub: true
		},
		{
			id: 'sellOrderCode',
			name: '订单编号'
		}, {
			id: 'installationProject',
			name: '安装项目'
		},
	],
	4: [
		
		{
			id: 'complainTypeName',
			name: '投诉类型'
		},
		{
			id: 'subComplainTypeName',
			name: '投诉子类型'
		},
		{
			id: 'concreteProblemsName',
			name: '具体问题'
		},
		{
			id: 'ifPurchaseName',
			name: '是否购买',
			isSub: true
		},
		{
			id: 'userAccount',
			name: '第三方平台账号'
		},
		{
			id: 'sellOrderCode',
			name: '订单编号/收银小票'
		}, {
			id: 'purchasePlatformName',
			name: '购买平台'
		},
		{
			id: 'sapSkuCode',
			name: '商品SKU'
		}, {
			id: 'productName',
			name: '商品名称'
		},
	],
	5: [
		{
			id: 'complainTypeName',
			name: '投诉类型'
		},
		{
			id: 'subComplainTypeName',
			name: '投诉子类型'
		},
		{
			id: 'concreteProblemsName',
			name: '具体问题'
		},
	]
}