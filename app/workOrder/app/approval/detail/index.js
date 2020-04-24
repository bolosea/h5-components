import React, {Component, useState, useEffect, Fragment} from 'react'
import http from '@workOrder/http'
import { getApplyDetail, passApply, refundApply } from '../api'
import * as Util from '@util'
import './index.less'
import WordImg from '@workOrder/imgs/icon-word@3x.png'
import Toast from "@/prompt/toast";
import Modal from "@workOrder/components/modal";
import {Modal as AntModal } from 'antd-mobile'
import {getCookie, getUrlArg} from "../../../../../util";
let alert = AntModal.alert
import {sessionToken} from '@workOrder/constant'


export default function ApprovalDetail(){
	let [detail,setDetail] = useState({})
	let [isApply,setIsApply] = useState(false)
	let [recordRemark,setRecordRemark] = useState(null)
	let [visible,setVisible] = useState(false)
	
	
	//获取token
	useEffect(()=>{
		let token = getUrlArg("TOKEN")
		let cookieToken = getCookie(sessionToken)
		if(token && cookieToken !== token){
			document.cookie = `${sessionToken}=${token};path=/;domain=.bnq.com.cn`
		}
	},[])
	
	useEffect(()=>{
		async function init(){
			if(!Object.keys(detail).length){
				let id = Util.getUrlArg('id')
				let detail = await http.get(getApplyDetail+'?id='+id)
				setDetail(detail.map.all[0])//迷之后台返回数据结构
				setIsApply(detail.ifShowButton)//ifShowButton为0的话是申请人
			}
		}
		init()
	},[detail])
	
	//驳回
	function refund(){
		let alertIns = alert('确认驳回','确认要驳回这个费用审批单吗？',[
			{
				text: '取消',onPress: ()=>{
					alertIns.close()
				}
			},{
				text: '确认',onPress: async ()=> {
					let res = await http.post(refundApply,{
						id: detail.id,
						recordRemark
					})
					if(res){
						Toast.show('操作成功!')
						location.reload()
					}
					alertIns.close()
				}
			}
		])
		
	}
	//通过
	async function pass() {
		let alertIns = alert('确认通过','确认要通过这个费用审批单吗？',[
			{
				text: '取消',onPress: ()=>{
					alertIns.close()
				}
			},{
				text: '确认',onPress: async ()=> {
					let res = await http.post(passApply,{
						id: detail.id,
						recordRemark
					})
					if(res){
						Toast.show('操作成功!')
						location.reload()
					}
					alertIns.close()
				}
			}
		])
		
	}
	return <div className='approval-detail'>
		<h1>单号:{detail.auditExpenseCode}</h1>
		<div className="status">
			<p>
				<span>当前处理状态</span>
				<span className='showAll' onClick={()=>setVisible(true)}>查看全部</span>
			</p>
			<p>{detail.nodeStatusName}</p>
			<p>联系方式: {detail.concats && detail.concats.map((phone,index)=> (<span key={index}><a style={{
				color: '#ffffff',
			}} href={`tel:${phone}`}>{phone}</a><br/></span>))}  </p>
		</div>
		<div className="detail">
			<h3 className="title">
				详细信息
			</h3>
			<p><span>所属门店:</span><span>{detail.shopName}</span></p>
			<p><span>所属类别:</span><span>{detail.applyTypeName}</span></p>
			<p><span>预算金额:</span><span>{Number(detail.budgetAmount)?(Number(detail.budgetAmount)/100).toFixed(2):0}</span></p>
			<p><span>申请金额:</span><span>{Number(detail.applyAmount)?(Number(detail.applyAmount)/100).toFixed(2):0}</span></p>
			<p><span>剩余金额:</span><span>{Number(detail.surplusAmount)?(Number(detail.surplusAmount)/100).toFixed(2):0}</span></p>
			<p><span>创建时间:</span><span>{detail.createTime}</span></p>
			<p><span>费用用途:</span><span>{detail.purpose}</span></p>
			<p><span>备注:</span><span>{detail.remark}</span></p>
		</div>
		<div className="file-list">
			{detail.workOrderAttachmentsVOList && detail.workOrderAttachmentsVOList.map(file=>{
				return (
					<a className='file' key={file.id} download={file.originalFileName} href={file.uploadPath + '?attname='+ file.originalFileName}>
						<div className="img-wrap">
							<img src={WordImg} alt="word"/>
						</div>
						<span className='name'>{file.originalFileName}</span>
					</a>
				)
			})}
			
		</div>
		{
			detail && detail.records && detail.records.map((record)=>
				<div className='ops' key={record.id}>
					<p>
						<span>{record.optPosition} {record.preStatusName} : {record.optName}</span>
						<span className='time'>{record.modifyTime}</span>
						<span className='stataus'>{record.auditOpinionName}</span>
					</p>
					<p>{record.remark}</p>
				</div>
			)
		}
		{(detail.nodeStatus === 4 || detail.nodeStatus === 5) ? '' : isApply ? (<Fragment><div className="idea">
			<h1 className="idea-title">
				审核意见
			</h1>
			<textarea className='content' maxLength={2000} onChange={(e)=>{
				e.persist()
				setRecordRemark(e.target.value)}
			} placeholder='请输入审核意见,不超过2000字'/>
		</div>
			<div className="op">
				<button onClick={()=>
					refund()
				}>驳回</button>
				<button onClick={()=>pass()}>通过</button>
			</div></Fragment>) :''
		}
		
		<Modal title='全部审批流程' visible={visible} onClose={()=>setVisible(false)}>
			{
				detail && detail.flowMapList && detail.flowMapList.map((fml,index)=>{
					return <p key={index}>
						<span className={fml.ifCurrentNode ? 'current':''}>{fml.nodeStatusName}</span>
						<span>{fml.time}</span>
					</p>
				})
			}
		</Modal>
	</div>
}
