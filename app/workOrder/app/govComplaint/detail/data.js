import React from 'react'
import Add from '@workOrder/imgs/add@3x.png'
import { getUrlArg } from '@util'

export const baseData = [
  {
    id: 'shopName',
    name: '所属门店'
  },
  {
    id: 'govDepartment',
    name: '抽查部门'
  },
  {
    id: 'upgradeStatusName',
    name: '升级状态'
  },
  {
    id: 'remarks',
    name: '备注',
  },
  // {
  //   id: 'skuCheckStatus',
  //   name: '任务清单'
  // },
  // {
  //   id: 'complainSourceName',
  //   name: '投诉来源'
  // },
  // {
  //   id: 'ifRationalComplaintName',
  //   name: '是否理性投诉'
  // },
  // {
  //   id: 'customerComplainContent',
  //   name: '投诉事件'
  // },
  // {
  //   id: 'customerAsk',
  //   name: '顾客要求'
  // },
 
  {
    id: 'file',
    name: '附件'
  }
]

export const detailData = [
  
  {
    id: 'ifQualifiedName',
    name: '抽查状态'
  },
  {
    id: 'sapSkuCode',
    name: '商品sku'
  },
  {
    id: 'productName',
    name: '商品名称'
  },
  {
    id: 'productBrand',
    name: '商品品牌'
  },
  {
    id: 'productClassOneName',
    name: '商品一级分类'
  },
  {
    id: 'productClassTwoName',
    name: '商品一级分类'
  },
  {
    id: 'productClassThreeName',
    name: '商品一级分类'
  },
  {
    id: 'productClassFourName',
    name: '商品一级分类'
  },
  {
    id: 'productSpecifications',
    name: '型号规格'
  }
 
]
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