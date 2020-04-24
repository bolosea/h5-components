import React,{Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './index.less'
import Home from './imgs/icon_home_365_long2@2x.png'
import { Modal, Button, WhiteSpace, WingBlank ,Toast} from 'antd-mobile';
import * as Util from "../../../util";
const alert = Modal.alert;
import { postToApp ,getMessage} from '../../../hybrid/hybrid'
import wx from "weixin-js-sdk";
import { getGiveOrderlist,refund,cancleGive } from "../api";
import Empty from './imgs/empty.png'

export default class Send extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			records: [],//赠送记录
			giveCustomerPhone: '',
			token: '',
		}
	}
	
	_showAlert = ({tip,ok,cancle,id,type}) => {
		alert('温馨提示', tip, [
			{ text: cancle, onPress: () => {
				
				} },
			{ text: ok, onPress: () => {
					type === 'cancleGive' ? this._cancleGive(id) : this._refund(id)
				} },
		]);
		
	};
	_refund = (id) => {
		let headers = new Headers()
		let token = this.state.token
		headers.append('TOKEN',token)
		
		fetch(refund + '?id='+id+'&refundRequestId='+ Date.now()+id,{
			headers
		}).then(res=>res.json()).then(res=>{
			Toast.info(res.msg,3,this._getGiveOrderlist(this.state.token,this.state.giveCustomerPhone))
		})
	}
	_cancleGive = (id) => {
		let headers = new Headers()
		let token = this.state.token
		headers.append('TOKEN',token)
		
		fetch(cancleGive + '?id='+id,{
			headers
		}).then(res=>res.json()).then(res=>{
			Toast.info(res.msg,3,this._getGiveOrderlist(this.state.token,this.state.giveCustomerPhone))
		})
	}
	componentDidMount() {
		let that = this
		let type = Util.getUrlArg('type')
		let token = Util.getUrlArg('TOKEN')
		let giveCustomerPhone = Util.getUrlArg('phone') //|| 15867124063
		this.setState({
			type,
			token,
			giveCustomerPhone
		})
		//token:'1@wdqaLJ6LCNYtef6xPcO8ZdVSml2WNAfJR3mkXelpQFwGQg.o2bSgl9o22HNisZdp@9esDyqZQA.O0TO3PGJj1CXKz_uaPRARUNa3Vvtal0qai7TS8NSrJqW_78OJt1Pcl'
		this._getGiveOrderlist(token,giveCustomerPhone)
		getMessage()
		window.LiveHome365 = {
			toWXShare: function (e) {
				that._getGiveOrderlist(token,giveCustomerPhone)
			}
		}
	}
	_getGiveOrderlist = (token,giveCustomerPhone) => {
		
		let headers = new Headers()
		headers.append('TOKEN',token)
		fetch(getGiveOrderlist + '?giveCustomerPhone=' + giveCustomerPhone,{
			headers,
		}).then((res)=>res.json()).then(res=>{
			this.setState({
				records: (res && res.result && res.result.data) || []
			})
		})
	}
	
	_send = (id) => {
		let {token,giveCustomerPhone} = this.state
		
		let params = Util.getUrlArg('params')
		let { type } = this.state
		params = JSON.parse(decodeURIComponent(params))
		params.id = id
		params = encodeURIComponent(JSON.stringify(params))
		if(type == 'miniProgram'){
			// wx.miniProgram.postMessage({data: params })
		}else{
			postToApp('LiveHome365','toWXShare',params,'LiveHome365','toWXShare')
		}
	}
	render() {
		let { records } = this.state
		let preSend = records.filter(record=>record.status === 2 || record.status === 7 ) || [] //待赠送
		let sended = records.filter(record=>record.status == 3 || record.status == 4) || [] // 已赠送
		return (
			<div className='send'>
				<Tabs>
					<TabList>
						<Tab>待赠送</Tab>
						<Tab>已赠送</Tab>
					</TabList>
					
					<TabPanel >
						{
							preSend.length > 0 ? preSend.map(record=>{
								return (
									<div className="card" key={record.id}>
										<p className='home'>
											<img src={Home} alt="home"/>
											{ (record.status === 7 || record.status === 5) && <span>{record.statusStr}</span>}
										</p>
										<p className='time'>购买时间：{record.payTimeStr}</p>
										{(record.status !=7 && record.status != 5) && <p className='op'>
											<button className='send-btn' onClick={()=>{
												this._send(record.id)
											}}>赠送</button>
											<button className='refund-btn' onClick={()=>{
												this._showAlert({
													tip: '您确定要选择退款吗?',
													cancle: '不退款',
													ok: '退款',
													id: record.id
												})
											}}>退款</button>
										</p>}
									</div>
								)
							}):<div className='empty'>
								<img src={Empty} style={{width: '50%'}}/>
								<p style={{fontSize: '.34rem'}}>暂无数据~</p>
							</div>
						}
						
					</TabPanel>
					<TabPanel >
						{
							sended.length > 0 ? sended.map(record=> {
								return (
								<div className={record.status === 4 ? "card status4" : 'card'} key={record.id}>
									<p className='home'><img src={Home} alt="home"/><span className={record.status == 4 ? 'status4':'' }>{record.statusStr}</span></p>
									<p className='time'>购买时间：{record.payTimeStr}</p>
									{record.status == 3 &&<p className='op'>
										<button className='cancle' onClick={()=>{
											this._showAlert({
												tip: '对方还未领取权益,您确定要取消赠送吗?',
												cancle: '不取消',
												ok: '确定',
												id: record.id,
												type: 'cancleGive'
											})
										}}>取消赠送</button>
									</p>}
									{record.status == 4 &&<p className='status4'>
										<span>领取人: {record.getCustomerName} {record.getCustomerPhone}</span>
										<span>领取日期: {record.getTimeStr}</span>
									</p>}
								</div>
								)
							}):<div className='empty'>
								<img src={Empty} style={{width: '50%'}}/>
								<p style={{fontSize: '.34rem'}}>暂无数据~</p>
							</div>
						}
						
					</TabPanel>
				</Tabs>
			</div>
		);
	}
	
}