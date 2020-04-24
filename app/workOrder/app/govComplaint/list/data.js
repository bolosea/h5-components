import React from "react";
import {Select} from "../../../components/select";

const fields = [
  {
    id: 'createTime',
    name: '创建时间'
  },
  {
    id: 'shopName',
    name: '所属门店'
  },
  {
    id: 'nodeStatusName',
    name: '处理状态'
  },
  {
    id: 'upgradeStatusName',
    name: '升级状态'
  },
  {
    id: 'taskListStatus',
    name: '任务清单',
  },
  {
    id: 'skuCheckStatus',
    name: '抽查商品'
  },
  // {
  //   id: 'sapSkuCode',
  //   name: '商品sku'
  // },
  // {
  //   id: 'productBrand',
  //   name: '品牌'
  // }
]
const tabFilters = (state = {})=>[
  {
    id: 1,
    name: '工单状态',
    code: 'workorderStatus',
    data: [
      {
        id: '1,2,3,4',
        name: '打开'
      },{
        id: '5',
        name: '关闭'
      }
    ]
  },
  {
    id: 2,
    name: '处理状态',
    code: 'currentNodeStatusStr',
    data: state.statusList || []
  },
  {
    id: 3,
    name: '所属门店',
    code: 'shopCodeStr',
    data: state.shopList || []
  }
]

const filters = [
  {
    id: 'createTime',
    type: 'rangepicker',
    name: '创建时间',
    timeNames: [
      'createTimeStartStr',
      'createTimeEndStr'
    ]
  },
  {
    id: 'workOrderGovCode',
    name: '单号'
  },
  // {
  //   id: 'shopCode',
  //   type: 'select',
  //   name: '门店',
  //   customKey: 'shopCode',
  //   itemName: 'shopName',
  //   getRealValue: 'shopCode'
  // },
  // {
  //   id: 'customerMobile',
  //   name: '顾客手机号',
  //
  // },
  // {
  //   id: 'customerType',
  //   name: '分配处理人',
  //   type: 'select',
  // },
  // {
  //   id: 'complainSource',
  //   name: '投诉来源',
  //   type: 'select',
  // },
  // {
  //   id: 'nodeStatus',
  //   name: '处理状态',
  //   type: 'select',
  // },
  {
    id: 'upgradeStatus',
    name: '升级状态',
    type: 'select',
  },
  // {
  //   id: 'ifRationalComplaint',
  //   name: '是否理性投诉',
  //   type: 'switch',
  // },
  
]
export {
  tabFilters,
  fields,
  filters
}
