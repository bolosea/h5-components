import React, {useState, useEffect, Fragment} from "react";
import {Info} from "@workOrder/components/info";
import "./index.less";
import {getUrlArg} from "@util";
import http from "@workOrder/http";
import {
	getComplaintDetail,
	govCloseComplaint,
	setRationalComplaint as setRationalComplaintApi,
	handleOver,
	getCustomerType,
	getUpgradeStatus,
	reDistribution,
	getGovComplaintDetail
} from "../api";
import {baseData, detailData, handleData, closeData} from "./data";
import * as CONSTANT from '@workOrder/constant'

const Log = Info.Log;
import {Modal} from 'antd-mobile'
import Toast from "../../../../../components/prompt/toast";
import BModal from "@workOrder/components/modal";
import {Select} from "@workOrder/components/select";
import New from "@workOrder/components/new";

import WordImg from '@workOrder/imgs/icon-word@3x.png'

const alert = Modal.alert
import Progress from "@workOrder/components/progress";
import Task from "@workOrder/components/task";
import {getCookie} from "../../../../../util";
import {sessionToken} from '@workOrder/constant'
/**
 *
 * @returns {string}
 * @constructor
 */
export default function ComplaintDetail() {
	const [data, setData] = useState(null);
	const [opVisible, setOpVisible] = useState(false)
	const [customerType, setCustomerType] = useState([])
	const [customVisible, setCustomVisible] = useState(false)
	const [selectCustom, setSelectCustom] = useState(null)
	const [handleVisible, setHandleVisible] = useState(false)
	const [closeVisible, setCloseVisible] = useState(false)
	const [closeeData, setCloseeData] = useState(closeData)
	
	//获取token
	useEffect(()=>{
		let token = getUrlArg("TOKEN")
		let cookieToken = getCookie(sessionToken)
		if(token && cookieToken !== token){
			document.cookie = `${sessionToken}=${token};path=/;domain=.bnq.com.cn`
		}
	},[])
	
	useEffect(() => {
		const id = getUrlArg("id");
		if (id) {
			init(id);
		}
		
		async function init(id) {
			let res = await http.get(getGovComplaintDetail + "?id=" + id);
			
			if (res) {
				let d = res.map.all[0]
				setData(d);
				sessionStorage.setItem(CONSTANT.complaintDetail, JSON.stringify(d))
			}
		}
	}, []);
	
	useEffect(() => {
		closeData && closeData.forEach(cd => {
			if (cd.id === 'ifRepeatOrder') {
				cd.onClick = (value) => {
					closeData[1].hide = !value
					setCloseeData(closeData)
				}
			}
		})
	}, [])
	
	async function _getCustomType() {
		let customerType = await http.get(getCustomerType)
		setCustomerType(customerType)
	}
	
	//关闭工单
	function close(form) {
		form.validateFields((error, values) => {
			if (error) {
				console.log('error: ', error);
				return;
			}
			_close(values)
		});
		
	}
	
	async function _close(values) {
		if (values['ifRepeatOrder']) {
			if (!values.repeatOrderCode) {
				return Toast.show('重复工单号不能为空!')
			}
		}
		const {id, version} = data
		let res = await http.post(govCloseComplaint, {
			id,
			version,
			ifRepeatOrder: Number(values['ifRepeatOrder']),
			repeatOrderCode: values.repeatOrderCode
		})
		console.log('res', res)
		if (typeof res === 'string') {
			Toast.show(res)
		}
		setCloseVisible(false)
		setTimeout(()=>{
		  location.reload()
		},1000)
	}
	
	//设置取消非理性投诉
	// async function setRationalComplaint(){
	//   const {id,ifRationalComplaint} = data
	//   let res = await http.post(setRationalComplaintApi,{
	//     id,
	//     ifRationalComplaint: +!ifRationalComplaint
	//   })
	//   if(res){
	//     Toast.show(res)
	//     setOpVisible(false)
	//   }
	// }
	//处理完成
	// async function handleOk(form){
	//   form.validateFields((error, values) => {
	//     if (error) {
	//       console.log('error: ', error);
	//       return;
	//     }
	//     _handleOK(values)
	//   });
	// }
	
	// async function _handleOK(values){
	//   const {id,version} = data
	//   let res = await http.post(handleOver,{
	//     id,
	//     version,
	//     ...values
	//   })
	//   Toast.show(res)
	//   setHandleVisible(false)
	//   setTimeout(()=>{
	//     location.reload()
	//   },1000)
	// }
	//重新分配
	// async function reDivide(){
	//   const {id,version} = data
	//   if(selectCustom){
	//     let res = await http.post(handleOver,{
	//       id,
	//       version,
	//       customerType: selectCustom.id
	//     })
	//     Toast.show(res)
	//     setCustomVisible(false)
	//     setTimeout(()=>{
	//       location.reload()
	//     },1000)
	//   }else{
	//     Toast.show('请先分配处理人!')
	//   }
	//
	// }
	
	
	function selectCallback(callback) {
		console.log('callback,', callback)
		setSelectCustom(callback)
	}
	
	return (
		data ? <div className="complaint-detail">
			<h1 className="title">抽查单详情</h1>
			<div className="header">
				<span>抽查单编号: {data['workOrderGovCode']}</span>
				<span>{data['nodeStatusName']}</span>
			</div>
			<Progress flowMapList={data["flowMapList"]}/>
			<Info
				fields={baseData}
				data={data}
				title="基本信息"
			/>
			<div className="file-list">
				{data.workOrderAttachmentsVOList && data.workOrderAttachmentsVOList.map(file => {
					return (
						<a className='file' key={file.id} download={file.originalFileName}
						   href={file.uploadPath + '?attname=' + file.originalFileName}>
							<div className="img-wrap">
								<img src={WordImg} alt="word"/>
							</div>
							<span className='name'>{file.originalFileName}</span>
						</a>
					)
				})}
			
			</div>
			<div className="prods">
				{
					data.workOrderSkuDetailVOList && data.workOrderSkuDetailVOList.map(detail=>{
						return <Info
							title={'商品信息'}
							fields={detailData}
							data={detail}
						/>
					})
				}
			</div>
			<Task data={data.workOrderTaskListVOList || []}/>
			<Log
				data={data.workOrderMessageBoardVOList}
			/>
			<div className="op-btn" onClick={() => setOpVisible(true)}>
				操作
			</div>
			{
				opVisible && <div className="op-modal">
					<div className="op-modal-wrapper">
						
						{/*<p>创建任务清单</p>*/}
						{/*<p onClick={() => {*/}
						{/*	setCloseVisible(true)*/}
						{/*	*/}
						{/*}}>关闭工单</p>*/}
						<p onClick={()=>location.href = './addGovComplaintLog?id=' + data.id}>添加留言日志</p>
						<p className='cancel' onClick={()=>setOpVisible(false)}>取消</p>
					</div>
				</div>
			}
			
			
			{/*<BModal visible={handleVisible} title={'处理完成'} customButton={null}>*/}
			{/*  <New data={handleData} customActions={(form)=>{*/}
			{/*    return <div className={'customButton'}>*/}
			{/*      <button onClick={()=>setHandleVisible(false)}>取消</button>*/}
			{/*      <button onClick={()=>{*/}
			{/*        handleOk(form)*/}
			{/*      }*/}
			{/*      }>处理完成</button>*/}
			{/*    </div>*/}
			{/*  }}/>*/}
			{/*</BModal>*/}
			
			<BModal visible={closeVisible} title={'关闭工单'} customButton={null}>
				<New data={closeeData} customActions={(form) => {
					return <div className={'customButton'}>
						<button onClick={() => setCloseVisible(false)}>取消</button>
						<button onClick={() => {
							close(form)
						}
						}>关闭工单
						</button>
					</div>
				}}/>
			</BModal>
		</div> : ''
	);
}
