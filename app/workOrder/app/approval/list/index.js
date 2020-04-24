import React, {Component, useState, useEffect, Fragment} from 'react'
import './index.less'
import http from '@workOrder/http'
import {getApplyList} from '../api'
import FilterImg from '@workOrder/imgs/icon-list-sx-n@3x.png'
import ArrowTop from '@workOrder/imgs/icon-arrow-top@3x.png'
import Filter from "@workOrder/components/filter";
import * as Util from '@util'


function Tab({applyList}) {
	const [data, setData] = useState(null);
	const [current, setCurrent] = useState('') //当前点击tab
	
	function initData() {
		let firstKey = Object.keys(applyList)[0] //js对象是无序的 但是这里没别的办法拿第一个key
		setData(applyList[firstKey])
		setCurrent(firstKey)
	}
	
	useEffect(() => {
		initData()
	},[applyList])
	
	
	function changeTab(key) {
		setCurrent(key)
		setData(applyList[key])
	}
	
	return (
		<div className='tab'>
			<div className="header">
				{
					Object.keys(applyList).map(key => {
						return <span className={current === key ? 'current' : ''} onClick={() => {
							changeTab(key)
						}
						} key={key}>{key}({applyList[key].length})</span>
					})
				}
			</div>
			<div className="content">
				{
					data && data.map(d => {
						return (<div className="card" onClick={() => {
							location.href = `./approvalDetail?id=${d.id}`
						}} key={d.id}>
							<h3>
								<span>单号: {d.auditExpenseCode}</span>
								<span className='status'>{d.nodeStatusName}</span>
							</h3>
							<div className="detail">
								<span>所属门店： {d.shopName}</span>
								<span>所属类别： {d.applyTypeName}</span>
								<span>申请金额： ￥{Number(d.applyAmount)?(Number(d.applyAmount)/100).toFixed(2):0}</span>
								<span>创建时间： {d.createTime}</span>
							</div>
						</div>)
					})
				}
			</div>
		</div>
	)
}


@Util.withCookie
export default class ApprovalList extends Component {
	
	state = {
		applyList: [],//列表
		visible: false,
	}
	
	componentDidMount() {
		
		this._initData()
	}
	
	_initData = async () => {
		let [applyList] = await Promise.all([this._getApplyList()])
		this.setState({
			applyList,
		})
	}
	
	_getApplyList = (params = undefined) => {
		let url = getApplyList
		if(params){
			delete params['budgetAmount']
			delete params['surplusAmount']
			delete params['applyTypeName']
			url = url + '?' + Util.parseObjToGet(params)
		}
		return http.get(url)
	}
	// _getAuditList = () => {
	// 	return http.get(getAuditList)
	// }
	_toggleFilter = async (params = null,callback) => {
		if( params){
			let applyList = await this._getApplyList(params)
			this.setState({
				applyList
			})
		}
		this.setState(({visible})=>({visible:!visible}),()=>callback && callback())
	}
	
	render() {
		return <Fragment>
			<div className='approval-list'>
				<div className="fake-title">
					{/*<img src={ArrowTop} alt="arrowTop"/>*/}
					{/*<span>费用审批列表</span>*/}
					<span className='filter' onClick={()=>this._toggleFilter()}><img src={FilterImg} alt="filter"/>筛选</span>
				</div>
				<Tab applyList={this.state.applyList.map}/>
				{this.state.applyList.roleType === 'apply' &&
				<button className='create' onClick={() => location.href = './newApproval'}>创建审批单</button>}
			</div>
			<Filter visible={this.state.visible} toggleFilter={this._toggleFilter}/>
		</Fragment>
	}
}