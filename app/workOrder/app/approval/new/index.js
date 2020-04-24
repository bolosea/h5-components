import React, {Component} from 'react'
import {getApplyType, getSubApplyType, getShopListAndCity, addApproval, buggetInfo} from '../api'
import { createForm } from 'rc-form';
import http from '@workOrder/http'
import CloseImg from '@workOrder/imgs/icon-list-close@3x.png'
import WordImg from '@workOrder/imgs/icon-word@3x.png'
import Toast from '@/prompt/toast'
import './index.less'
import {withSelect} from '@workOrder/components/select'
import {Modal} from "antd-mobile";
const alert = Modal.alert
import * as Util from '@util'
import {MAX_UPLOAD_SIZE} from '@workOrder/constant'

@Util.withCookie
@createForm()
@withSelect
export default class NewApproval extends Component {
	
	state = {
		fileList: [],
		params: {
			//新增参数
		},
		disabled: false,
	}
	
	_handleChange = (e, flag) => {
		let [file] = e.target.files
		if(file.size >= MAX_UPLOAD_SIZE){
			Toast.show('上传最大支持5M大小的文件!')
			return
		}
		console.log('e.target.files',e.target.files)
		this.setState({
			fileList: this.state.fileList.concat([file])
		})

	}
	_addFile = () => {
		let fileEle = document.querySelector("#file");
		fileEle.click()
	}
	
	//新增审批
	_postNewApproval = async (params) => {
		//死命催 只能先这样临时应付一下
		this.setState({
			disabled: true
		})
		let formData = new FormData()
		Object.keys(params).map(k=>formData.append(k,params[k]))
		this.state.fileList.forEach(file=>formData.append('file',file))
		let res = await http.post(addApproval, formData)
		if(res){
			Toast.show(res)
			location.href = './approvalList'
		}
		this.setState({
			disabled: false
		})
	}
	//新增审批
	_addApproval = () => {
		alert('确认创建','是否确认创建工单?',[
			{
				text: '取消',
				onPress: ()=>{
				
				}
			},
			{
				text: '确认',
				onPress: () => {
					
					this.props.form.validateFields((error, values) => {
						if(error){
							return
						}
						if(values['applyAmount']){
							values['applyAmount'] = (parseInt((values['applyAmount'] * 100).toFixed(0)))
						}
						this._postNewApproval({
							...this.props.selectData.params,
							...values
						})
					});
				}
			}
		])
		
	}
	
	_removeFile = (file) => {
		this.setState({
			fileList: this.state.fileList.filter(fs=>fs.name !== file.name)
		})
	}
	
	render() {
		let errors;
		const { getFieldProps, getFieldError } = this.props.form;
		return <div className='new-approval'>
			<div className="money">
				<h1>申请金额(元)</h1>
				<p className='budget'>
					<span>预算金额: {Number(this.props.selectData.params.budgetAmount)/100?Number(this.props.selectData.params.budgetAmount)/100:0}</span>
					<span>剩余金额: {Number(this.props.selectData.params.surplusAmount)/100?Number(this.props.selectData.params.surplusAmount)/100:0}</span>
				</p>
				<input onKeyUp={e=>{
					let reg = /^(([0-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/g
					e.target.value = e.target.value.match(reg)?e.target.value.match(reg)[0]: ''
				}}  {...getFieldProps('applyAmount',{
					initialValue: '',
					rules: [{required: true,message: '申请金额不能为空!'}],
					onChange(e){
						// console.log('e.target.value',e.target.value)
						// if(!Number(e.target.value) && Number(e.target.value) !== 0){
						// 	e.target.value = e.target.value.slice(0,e.target.value.length-1)
						// }
					},
				})}/>
				<span className='error'>{(errors = getFieldError('applyAmount')) ? errors.join(',') : null}</span>
			</div>
			<div className="use">
				<h1>用途</h1>
				<textarea maxLength={200} {...getFieldProps('purpose',{
					              rules: [{required: true,message: '用途不能为空!'}],
				              })}
				/>
				<span className='error'>{(errors = getFieldError('purpose')) ? errors.join(',') : null}</span>
			</div>
			<div className="note">
				<h1>备注</h1>
				<textarea maxLength={100} {...getFieldProps('remark',{
					initialValue: ''
				})}/>
			</div>
			<div className='files'>
				<h1>上传附件（支持xcl/pdf/doc等格式）</h1>
				<div className="fileWraper">
					<div className="file-item fake-file" onClick={() => this._addFile()}>
						<span>+</span>
					</div>
					{
						this.state.fileList.length>0?this.state.fileList.map((fs,index)=> (
							<div key={index} className='file-item'>
									<img src={WordImg} alt="word"/>
									<span>{fs.name}</span>
								<img onClick={()=>this._removeFile(fs)} src={CloseImg} alt="close" className='file-close'/>
							</div>)
							)
					:
					''
					}
					<input id='file' type='file' onChange={(e) => this._handleChange(e, 'file')}/>
				</div>
			</div>
			<button className='add-btn' disabled={this.state.disabled} onClick={()=>this._addApproval()}>提交</button>
		</div>
	}
}
