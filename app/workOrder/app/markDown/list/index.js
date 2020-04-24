import React, { Component, useState, useEffect, Fragment } from 'react'
import './index.less'
import http from '@workOrder/http'
import { getApplyList } from '../api'
import FilterImg from '@workOrder/imgs/icon-list-sx-n@3x.png'
import ArrowTop from '@workOrder/imgs/icon-arrow-top@3x.png'
// import Filter from "@workOrder/components/filter";
import Filter from "@workOrder/components/filter/index.V2.js";
import * as Util from '@util';

import {filters} from './data';


function Tab({ applyList}) {
    const [data, setData] = useState(null);//tab下内容
    const [current, setCurrent] = useState(''); //当前点击tab,
    const [detailUrl, setDedetailUrl] = useState(null)

    function initData() {
        let firstKey = Object.keys(applyList.map)[0];//js对象是无序的 但是这里没别的办法拿第一个key
        let roleStatus = applyList.roleType;
        setData(applyList.map[firstKey]);
        setCurrent(firstKey);

        if(roleStatus === 'apply') {
            //申请人
            setDedetailUrl('markDownDetailApply')
        }else if(roleStatus === 'cmAudit'){
            //cm审批
            setDedetailUrl('markDownDetailCmAudit')
        }else if(roleStatus === 'processAudit') {
            //process审批
            setDedetailUrl('markDownDetailProcessAudit') 
        }else {
            //readOnly
            setDedetailUrl('markDownDetail')
        }
    }


    useEffect(() => {
        initData(); //list数据
    }, [applyList])

    // useEffect(() => {
    //     initRole();
    // })
    function changeTab(key) {
        setCurrent(key)
        setData(applyList.map[key])
    }

    return (
        <div className='tab'>
            <div className="header">
            {
                Object.keys(applyList.map).map((key) => (
                    <span key={key} className={key === current ? 'current' : ''} onClick={() => changeTab(key)}>
                        {`${key}(${applyList.map[key].length})`}
                    </span>
                ))
            }
            </div>
            <div className="content">
                {console.log(detailUrl)}
            {
                data && data.map(d => (
                    <div className="card" onClick={
                        // () => { location.href = `./${detailUrl}?id=${d.id}` }} key={d.id}
                        () => { location.href = `./${'markDownDetailCmAudit'}?id=${d.id}` }} key={d.id}
                        >
                        <h3>
                            <span>单号: {d.workOrderCode}</span>
                            <span className='status'>{d.nodeStatusName}</span>
                        </h3>
                        <div className="detail">
                            <span>所属门店： {d.shopName}</span>
                            <span>所属类别： {d.applyTypeName}</span>
                            <span>申请金额： ￥{Number(d.applyAmount) ? (Number(d.applyAmount)/100).toFixed(2) : 0}</span>
                            <span>创建时间： {d.createTime}</span>
                        </div>
                    </div>)
                )
            }
            </div>
        </div>
    )
}


@Util.withCookie
export default class MarkDownList extends Component {

    state = {
        applyList: [], //markdownlist`
        visible: false, //filter-components,
        // orderStatus: [], //工单状态,
        // ShopList: []//门店状态
    }

    componentDidMount() {

        this._initData();
    }

    _initData = async () => {
        let [applyList] = await Promise.all([this._getApplyList()]);

        this.setState({
            applyList,
            // ShopList,
            // orderStatus
        });
        // filters.map(filter => {
        //     if(filter.id === 'shopCode') {
        //         filter.data = getShopListAndCity
        //     }
        //     if(filter.id === 'nodeStatus'){
        //         filter.data = orderStatus
        //     }
        // })
    }

    _getApplyList = (params = undefined) => {
        let url = getApplyList;

        if (params) {
                delete params['budgetAmount']
                delete params['surplusAmount']
                delete params['applyTypeName'] 
                console.log(params);           
            url = url + '?' + Util.parseObjToGet(params)
        }
        return http.get(url);
    }

    // //门店
	// _getShopList = () => {
	// 	return http.get(getShopList)
	// }
	// //工单状态 处理状态
	// _getStatusList = () => {
	// 	return http.get(getNodeStatus)
	// }
    // _getAuditList = () => {
    // 	return http.get(getAuditList)
    // }

    //切换model - show/hide
    _toggleFilter = async (params = null, callback) => {
        if (params) {
            let applyList = await this._getApplyList(params)
            this.setState({
                applyList
            })
        }
        this.setState(
			({visible}) => ({visible: !visible}),
			() => callback && callback()
		);
    }

    _handleSearch = async(params) => {
        try{
            let applyList = await this._getApplyList(params);
            this.setState({
                applyList,
            });
        }catch(err) {
            console.log(error);
        }
    }
    
    render() {
        const { applyList, visible } = this.state;

        return <Fragment>
            <div className='mark-list'>
                <div className="fake-title">
                    <img src={ArrowTop} alt="arrowTop" />
                    <span>markDown审批单列表</span>
                    <span className='filter' onClick={() => this._toggleFilter()}><img src={FilterImg} alt="filter" />筛选</span>
                </div>

                <Tab applyList={applyList}/>

                {/* 判断是审批人（audit）还是申请人（apply） - 更新审批单 */}
                {/* { applyList.roleType === 'apply' &&
                    <button className='create' onClick={() => location.href = './newMApproval'}>创建审批单</button> } */}
            </div>
            {/*<Filter visible={visible} toggleFilter={this._toggleFilter} />*/}
            {<Filter
                visible={visible}
                toggleFilter={this._toggleFilter}
                filters={filters}
                handleSearch={this._handleSearch}
                handleReset={this._handleReset}
				/>}
        </Fragment>
    }
}
