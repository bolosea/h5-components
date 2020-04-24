
export const productFields = [
  {
    id: "sapSkuCode",
    name: "商品sku",
  },
  {
    id: "productBrand",
    name: "商品品牌",
  },
  {
    id: "productName",
    name: "商品名称"
  },
  {
    id: "productClassOneName",
    name: "商品一级分类"
  },
  {
    id: "productClassTwoName",
    name: "商品二级分类"
  },
  {
    id: "productClassThreeName",
    name: "商品三级分类"
  },
  {
    id: "productClassFourName",
    name: "商品四级分类"
  },
]
export const newData = [
  {
    id: "ifPurchase",
    name: "是否购买",
    type: "radio",
    data: [
      {
        label: "是",
        value: 1
      },
      {
        label: "否",
        value: 0
      }
    ]
  },
  {
    id: "contractNumber",
    name: "合同编号"
  },
  {
    id: "contractProperty",
    name: "合同属性",
    type: 'radio'
  },
  {
    id: "renovationAddress",
    name: "装修地址"
  },
  {
    id: "constructionLeader",
    name: "施工队长"
  },
  {
    id: "projectManager",
    name: "工程管理员"
  },
  {
    id: "designer",
    name: "设计师"
  },
  {
    id: "budgetOfficer",
    name: "预算员"
  },
  {
    id: "ifInvolveProductComplain",
    name: "是否涉及商品投诉",
    type: "radio",
    data: [
      {
        label: "是",
        value: 1
      },
      {
        label: "否",
        value: 0
      }
    ]
  },
  ...productFields,
  // {
  //   id: "sapSkuCode",
  //   name: "商品sku",
  // },
  // {
  //   id: "productBrand",
  //   name: "商品品牌",
  // },
  // {
  //   id: "productName",
  //   name: "商品名称"
  // },
  // {
  //   id: "productClassOneName",
  //   name: "商品一级分类"
  // },
  // {
  //   id: "productClassTwoName",
  //   name: "商品二级分类"
  // },
  // {
  //   id: "productClassThreeName",
  //   name: "商品三级分类"
  // },
  // {
  //   id: "productClassFourName",
  //   name: "商品四级分类"
  // },
  {
    id: "ifWarrantyPeriod",
    name: "是否保修期内",
    type: "radio",
    data: [
      {
        label: "是",
        value: 1
      },
      {
        label: "否",
        value: 0
      }
    ]
  },
  // {
  //   id: "file",
  //   name: "上传附件(支持xcl/pdf/doc等格式)",
  //   type: "file"
  // }
];

