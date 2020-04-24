import React, {Component, useEffect, useState, Fragment} from "react";
import ArrowDown from "@workOrder/imgs/icon-arrow-down@3x.png";
import ArrowUp from "@workOrder/imgs/icon-arrow-top@3x.png";
import './index.less'
import http from "@workOrder/http";
import {getApplyType, getShopListAndCity, getSubApplyType, buggetInfo} from "@workOrder/app/approval/api";
import * as Util from '@util'


function setHighlight(eles,clicked,key) {
	let flag = true
	eles.forEach(se => {
		if(se['dataset']['flag'] == clicked[key]){
			if(se.classList.contains('selected')){
				se.classList.remove('selected')
				flag = false
			}else{
				se.classList.add('selected')
			}
		}else{
			se.classList.remove('selected')
		}
	})
	return flag
}
function removeHighlight(eles){
	eles.forEach(se=>se.classList.remove('selected'))
}

/**
 *
 * @param data 父节点数据
 * @param title 标题
 * @param customKey 自定义唯一键
 * @param itemName 要显示的文本的key 默认select后端返回的是{code: "waitHandle", name: "等待处理", id: 1}数据 所以默认显示name 但是有时候
 * 返回的是{shopCode: 'xx',shopName: 'xx'} 所以要设置itemName
 * @param showSubType 根据选择的父节点获取子节点的FN
 * @param subItemName 要显示的子文本的key
 * @param selectedCallback 选择子节点的callback
 * @param onChange 用于rc-form获取值
 * @param isReset 是否重置
 * @param getRealValue 真实节点的key
 * @returns {*}
 * @constructor
 */
export function Select({data = [], title = 'select',customKey = 'id' ,itemName = 'name',showSubType,subItemName = '',selectedCallback,isReset,onChange, getRealValue = 'id'}) {
	subItemName = subItemName === '' ? itemName : subItemName
	//显示更多
	let [showmore, setShowmore] = useState(false)
	//显示子类
	let [visible, setVisible] = useState(false)
	
	//子类数据
	let [subData, setSubData] = useState([])
	
	let [seleted, setSelected] = useState(null)
	
	useEffect(()=>{
		if(isReset){
			let spansEle = document.querySelectorAll(`.${title} span`);
			console.log('spansEle',spansEle)
			removeHighlight(spansEle)
			setVisible(false)
			setShowmore(false)
			onChange && onChange('')
		}
	},[isReset])
	
	let itemsEle = document.querySelector(`.${title}`);
	useEffect(() => {
		if (itemsEle) {
			itemsEle.style.overFlow = showmore ? 'visible' : 'hidden'
			itemsEle.style.height = showmore ? '100%' : '1.8rem'
		}
	})
	
	async function handleShowSubType(record) {
		let data = await showSubType(record)
		setSubData(data)
		setVisible(true)
	}
	
	function toggleSelected(clicked){
		let spansEle = document.querySelectorAll(`.${title} span`);
		return setHighlight(spansEle,clicked,customKey)
	}
	
	return <div className='select'>
		<h1 className='title-wrap'>
			<span>{title}</span>
			<img onClick={() => setShowmore(!showmore)}
			     className='arrow-down'
			     src={showmore ? ArrowUp : ArrowDown}
			     alt='arrow'
			/>
		</h1>
		<div className={"items " + title}>
			{data.filter(d=>Object.keys(d).length).map(record => {
				return <span data-flag={`${record[customKey]}`} key={record[customKey]} onClick={() => {
					showSubType && handleShowSubType(record)
					let flag = toggleSelected(record)
					onChange && onChange(flag ? record[getRealValue] : '')
					if(!showSubType){
						selectedCallback && selectedCallback(record)
					}
				}}>{record[itemName]}</span>
			})}
		</div>
		{/*title用于区分select*/}
		<SubModal visible={visible} subData={subData} subItemName={subItemName} title={title} selectedCallback={selectedCallback}/>
	</div>
}

/**
 *
 * @param visible 是否显示子节点
 * @param subData 子节点数据
 * @param subItemName 子节点的显示的key
 * @param title 父节点的title
 * @param selectedCallback 回调
 * @returns {*}
 * @constructor
 */
function SubModal({visible,subData,subItemName,title,selectedCallback}){
	let [seleted, setSelected] = useState(null)
	
	function toggleSelected(clicked){
		let spansEle = document.querySelectorAll(`.subModal.${title} span`);
		setHighlight(spansEle,clicked,'id')
		selectedCallback(clicked)
		
	}
	return visible && <div className={"subModal " + title} >
		{
			subData.map(d => <span key={d.id} data-flag={`${d.id}`} className={'sub'} onClick={()=>toggleSelected(d)}>{d[subItemName]}</span>)
		}
		<div className="arrow"/>
	</div>
}

//费用审批专用..
class SelectWrapper extends Component{
	state = {
		applyTypeData: [],
		cityAndShops: [],
		params: {
		
		},
		isReset: false,//是否重置
	}
	
	componentDidMount() {
		this._initData()
	}
	
	_getApplyType = async () => {
		return http.get(getApplyType)
	}
	_getCitysAndShops = () => {
		return http.get(getShopListAndCity)
	}
	//初始化
	_initData = async () => {
		let [applyTypeData, cityAndShops] = await Promise.all([this._getApplyType(), this._getCitysAndShops()])
		this.setState({
			applyTypeData,
			cityAndShops
		})
	}
	_appTypeSelectCallback = (selected) => {
		this.state.applyTypeData.forEach(atd=>{
			if(atd.dataIndex === selected.parentDataIndex){
				this.setState({
					params: {
						...this.state.params,
						applyType: atd.dataIndex,
						applyTypeName: atd.dataName,
						applyTypeCode: atd.dataTypeCode,
						subType: selected.dataIndex
					},
					isReset: false
				})
			}
		})
	}
	_shopSelectCallback = ({cityId,shopName,shopCode,id:shopId}) => {
		this.state.cityAndShops.forEach(cas=>{
			if(cas.cityId === cityId){
				this.setState({
					params: {
						...this.state.params,
						shopName,
						shopCode,
						shopId
					},
					isReset: false
				},()=>{
					this._getBugget(this.state.params.applyType)
				})
			}
		})
	}
	//获取审批子类
	_getSubApplyType = async (record) => {
		this.setState(({params})=>({
			params: {
				...params,
				applyType: record.dataIndex
			}
		}))
		 this._getBugget(record.dataIndex)
		
		return http.get(getSubApplyType+'?index='+record.dataIndex)
	}
	_getBugget = async (applyType) => {
		let {shopId,shopCode,shopName } = this.state.params
		if(shopId && applyType){
			let {budgetAmount,surplusAmount}  = await http.get( buggetInfo + '?' + Util.parseObjToGet({
				// shopId,
				shopCode,
				// shopName,
				applyType
			}))
			return this.setState(({params})=>({
				params: {
					...params,
					budgetAmount,
					surplusAmount
				}
			}))
		}
		
	}
	//获取门店
	_getSubShops = (record) => {
		return new Promise((resolve,reject)=>{
			try{
				resolve(this.state.cityAndShops.filter(cas=>cas.cityId === record.cityId)[0]['shopDtos'])
			}catch(err){
				reject(err)
			}
		})
	}
	_handleReset = () => {
		this.setState({
			params: {},
			isReset: true
		})
	}
	render() {
		return (
			<Fragment>
				<Select isReset={this.state.isReset} data={this.state.cityAndShops}  title={'门店'} customKey='cityId' itemName='cityName' subItemName='shopName' showSubType={this._getSubShops} selectedCallback={this._shopSelectCallback}/>
				<Select isReset={this.state.isReset} data={this.state.applyTypeData} title={'类别'}  itemName='dataName' showSubType={this._getSubApplyType} selectedCallback={this._appTypeSelectCallback}/>
				{
					this.props.render(this.state,this._handleReset)
				}
			</Fragment>
		);
	}
	
}
export function withSelect(Component) {
	return class extends React.Component{
		render() {
			return (
				<SelectWrapper render={(state,reset)=><Component {...this.props} handleReset={reset} selectData={state}/>}/>
			)
		}
	}
}