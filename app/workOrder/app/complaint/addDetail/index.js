import React, { Component, useState, useEffect } from "react";
import { getProductInfoBySku } from "../api";
import http from "@workOrder/http";
import Toast from "@/prompt/toast";
import "./index.less";
import { Modal } from "antd-mobile";
const alert = Modal.alert;
import { newData, productFields} from "./data";
import New from "@workOrder/components/new";
import * as CONSTANT from '@workOrder/constant'
import { saveComplainDetail, getContractProperty, getComplainType, getSubComplainType } from '../api'


export default function AddComplaintDetail() {
	const [reload, setReload] = useState(false)
	//合同属性
	const [contractProperty, setContractProperty] = useState(null)
	//投诉类型
	const [complainType, setComplainType] = useState(null)
	//详情
	const [detail, setDetail] = useState(()=>{
		const detailData = sessionStorage.getItem(CONSTANT.complaintDetail)
		if(detailData){
			return JSON.parse(detailData)
		}
		return null
	})
	
	//初始化数据
	useEffect(()=>{
		async function init(){
			const [cp,ct] = await Promise.all([http.get(getContractProperty),http.get(getComplainType)])
			setContractProperty(cp)
			setComplainType(ct)
		}
		init()
	},[])
	
	//监听事件
	useEffect(()=>{
		newData.forEach(n=>{
			if(n.id === 'sapSkuCode'){
				n.onBlur = async (key,e) => {
					let pdInfo = await http.get(getProductInfoBySku,{
						params: {
							[key]: e.target.value
						}
					})
					if(pdInfo){
						Object.keys(pdInfo).forEach(k=>{
							productFields.forEach(item=>{
								if(item.id === k){
									item.initialValue = pdInfo[k]
								}
							})
						})
					}else{
						productFields.forEach(item=>{
								item.initialValue = ''
						})
					}
					setReload(!reload)
				}
			}
		})
	})
	
	//保存详情
	async function save(values){
		console.log('save',values)
		const formData = new FormData()
		Object.keys(values).forEach(k=>{
			if(Array.isArray(values[k]) && values[k].length){
				for(const value of values[k]){
					if(value instanceof File){
						formData.append('file',value)
					}
				}
			}else{
				formData.append(k,values[k])
			}
		})
		
		let res = await http.post(saveComplainDetail,{
			...detail,
			...formData,
		})
		console.log('res',res)
	}
  return (
    <div className="add-complaint-detail">
      <New data={newData} addNew={save}/>
    </div>
  );
}
