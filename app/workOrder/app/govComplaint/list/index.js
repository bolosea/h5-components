import React, {Component, useState, useEffect, Fragment} from "react";
import "./index.less";
import http from "@workOrder/http";
import {getGovComplaintList, getShopList, getNodeStatus, getComplaintSource, getCustomerType, getUpgradeStatus} from "../api";
import FilterImg from "@workOrder/imgs/icon-list-sx-n@3x.png";
import ArrowTop from "@workOrder/imgs/icon-arrow-top@3x.png";
import Filter from "@workOrder/components/filter/index.V2.js";
import * as Util from "@util";
import Tab from '@workOrder/components/tab'
import List from '@workOrder/components/list'
import {fields, tabFilters, filters} from './data'
import {DatePicker} from '@workOrder/components/datepicker'

@Util.withCookie
export default class ComplaintList extends Component {
	state = {
		complaintList: [], //投诉列表
		shopList: [], //门店
		statusList: [], //状态
		complainSource: [],//投诉来源
		customerType: [],//顾客类型
		upgradeStatus: [],//升级状态
		visible: false
	};
	
	componentDidMount() {
		this._initData();
	}
	
	_initData = async () => {
		let [complaintList, shopList, statusList, complainSource,
			customerType, upgradeStatus] = await Promise.all([this._getComplaintList(), this._getShopList(), this._getStatusList(), this._getComplaintSource(),
		this._getCustomerType(),this._getUpgradeStatus()]);
		this.setState({
			complaintList,
			shopList,
			statusList,
			complainSource,
			customerType,
			upgradeStatus
		});
		filters.forEach(ft => {
			if (ft.id === 'complainSource') {
				ft.data = complainSource
			}
			if(ft.id === 'customerType'){
				ft.data = customerType
			}
			if(ft.id === 'upgradeStatus'){
				ft.data = upgradeStatus
			}
			if(ft.id === 'nodeStatus'){
				ft.data = statusList
			}
			if(ft.id === 'shopCode'){
				ft.data = shopList
			}
		})
	};
	
	//投诉列表
	_getComplaintList = (params = undefined) => {
		let url = getGovComplaintList;
		if (params) {
			url = url + "?" + Util.parseObjToGet(params);
		}
		return http.get(url);
	};
	//门店
	_getShopList = () => {
		return http.get(getShopList)
	}
	//工单状态 处理状态
	_getStatusList = () => {
		return http.get(getNodeStatus)
	}
	//投诉来源
	_getComplaintSource = () => {
		return http.get(getComplaintSource)
	}
	
	//顾客类型
	_getCustomerType = () => {
		return http.get(getCustomerType)
	}
	//升级状态
	_getUpgradeStatus = () => {
		return http.get(getUpgradeStatus)
	}
	//切换模态框
	_toggleFilter = async (params = null, callback) => {
		if (params) {
			let complaintList = await this._getComplaintList(params);
			this.setState({
				complaintList
			});
		}
		this.setState(
			({visible}) => ({visible: !visible}),
			() => callback && callback()
		);
	};
	
	_filterCallback = async (condition) => {
		console.log('condition', condition);
		let params = {}
		tabFilters().forEach(filter => {
			const key = filter['code']
			if (condition[key]) {
				//这里item.shopCode 必须放前面
				params[key] = condition[key].map(item => item.shopCode || item.id).join(',')
				if(key === 'workorderStatus'){
					params['currentNodeStatusStr'] = params[key]
					delete params[key]
				}
			}
		})
		console.log('params', params);
		let complaintList = await this._getComplaintList(params)
		this.setState({
			complaintList
		})
	}
	
	_handleSearch = async (params) => {
		let complaintList = await this._getComplaintList(params)
		this.setState({
			complaintList,
			visible: false
		})
	}
	_handleReset = () => {
		this._initData()
		this._toggleFilter()
	}
	render() {
		
		return (
			<Fragment>
				<div className="complaint-list">
					<div className="fake-title">
						<img src={ArrowTop} alt="arrowTop"/>
						<span>政府抽查单列表</span>
						<span className="filter" onClick={() => this._toggleFilter()}>
              <img src={FilterImg} alt="filter"/>
              筛选
            </span>
					</div>
					<Tab filters={tabFilters(this.state)} callback={this._filterCallback}/>
					<List data={this.state.complaintList} fields={fields} clickCallback={(id)=>window.location.href = './govComplaintDetail?id='+id}/>
					{this.state.complaintList.roleType === "complaint" && (
						<button
							className="create"
							onClick={() => (location.href = "./newComplaint")}
						>
							创建投诉工单
						</button>
					)}
				</div>
				{<Filter
					visible={this.state.visible}
					toggleFilter={this._toggleFilter}
					filters={filters}
					handleSearch={this._handleSearch}
					handleReset={this._handleReset}
				/>}
				 {/*<DatePicker></DatePicker>*/}
			</Fragment>
		);
	}
}
