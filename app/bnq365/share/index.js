import React, {Component} from 'react'
import * as Util from '../../../util/index';
import {getProductList,getCardStatus} from '../api'
import Carousel from 'nuka-carousel';

import './index.less'
import Home from './imgs/home.png'
import Five from './imgs/five.png'
import Img108 from './imgs/108.png'
import Good from './imgs/n_icon_good@2x.png'
import Free from './imgs/n_icon_free@2x.png'
import Green from './imgs/n_icon_green@2x.png'
import Grail from './imgs/n_icon_grail@2x.png'
import DD from './imgs/small_dd@2x.png'
import Page1 from './imgs/page_1@2x.png'
import Page2 from './imgs/page_2@2x.png'
import Page3 from './imgs/page_3@2x.png'
import Page4 from './imgs/page_4@2x.png'
import Page5 from './imgs/page_5@2x.png'
import Page6 from './imgs/page_6@2x.png'
import Tag from "./imgs/info_tag.png";
import Pagea from './imgs/page_a@2x.png'
import Pageb from './imgs/page_b@2x.png'
import Pagec from './imgs/page_c@2x.png'
import Paged from './imgs/page_d@2x.png'
import Pagee from './imgs/page_e@2x.png'
import Pagef from './imgs/page_f@2x.png'
import Pageg from './imgs/page_g@2x.png'
import Pageh from './imgs/page_h@2x.png'
import wx from 'weixin-js-sdk'
import { postToApp } from '../../../hybrid/hybrid'
import { Toast } from 'antd-mobile';

export default class Share extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			categoryList: void 0,
			title: undefined,//用于来源是小程序的时候 底部按钮变成领取
			canReceive: true,//可领取
		}
	}
	
	_getProductList = async () => {
		let data = await fetch(getProductList).then(res => res.json())
		let categoryList = data.result.data.categoryList
		let cl = Math.max.apply(null,categoryList.map(category=>category.productList.length))
		this._isEven(cl) ? cl++ : ''
		categoryList.map(cg=>{
			if(cg.productList.length !== cl){
				cg.productList = cg.productList.concat(Array(cl-cg.productList.length).fill({
					itemName: ''
				}))
			}
		})
		this.setState({
			categoryList
		})
	}
	
	async componentDidMount() {
		let type = Util.getUrlArg('type')
		let title = Util.getUrlArg('title') || undefined
		
		console.log('type', type)
		this.setState({
			type,
			title
		})
		
		
		this._getProductList()
		this._addTouchListener()
		if(type == 'miniProgram' && title == 'send'){
			let params = Util.getUrlArg('params') || undefined
			let token = Util.getUrlArg('TOKEN') || undefined
			params = JSON.parse(decodeURIComponent(params))
			await this._getCardStatus(params.id,token)
		}
		
	} 
	//如果是领取卡片的时候 获取卡片状态
	_getCardStatus = (id,token) => {
		let headers = new Headers()
		headers.append('TOKEN',token)
		fetch(getCardStatus+'?id='+id,{
			headers
		}).then(res=>res.json()).then(res=>{
			console.log('res',res);
			let {status} = res.result.data
			if(status!==3){
				this.setState({
					canReceive: false
				})
			}
		}).catch(e=>{
			this.setState({
				canReceive: false
			})
		})
	}
	_addTouchListener = () => {
		let serviceItem = document.querySelector("service-item");
		console.log('serviceItem',serviceItem)
	}
	//忽略大小写
	equal = (a, b) => {
		return a === b || a === b.toUpperCase() || a === b.toLowerCase()
	}
	
	download = () => {
		let {type} = this.state
		console.log(123)
		let params = Util.getUrlArg('params')
		if(type == 'miniProgram'){
			console.log('wx',wx)
			// if(this.state.canReceive){
				wx.miniProgram.redirectTo({
					url:  '/pages/liveHome365/subscribe/subscribe?params=' + params
				})
			// }else{
			// 	Toast.info('权益卡已领取或者已取消!')//权益卡已被领取  权益卡已被赠送人取消
			// }
			
		}else if (type == 'app') {
			console.log('app',params)
			postToApp('LiveHome365','toSubscribe',params)
		}else{
			window.location.href = 'https://zt.web.bnq.com.cn/project/app_down.html'
		}
		
	}
	
	_isEven = (num) => {
		return num % 2 !== 0
	}
	render() {
		return (
			<div className={this.equal('app', this.state.type) ? 'app share' : 'share'}>
				<div className="nav">
				</div>
				<div className="worry">
					<div className='title'>
						<p>您的家中是否也有</p><p>这样的困扰?</p>
					</div>
					<h3>随着房屋年龄的增长 各种问题接踵而来</h3>
					<ul>
						<li><img src={Pagea} alt=""/>
							<p className='wpp'>台盆、台面、水槽</p>
							<p className='wpp'>四周硅胶发霉损坏</p>
						</li>
						<li><img src={Pageb} alt=""/>
							<p>踢脚线老化脱落</p>
						</li>
						<li><img src={Pagec} alt=""/>
							<p className='wpp'>开关、空气开关</p>
							<p className='wpp'>插座损坏</p>
						</li>
						<li><img src={Paged} alt=""/>
							<p>门窗密封条损坏</p>
						</li>
						<li><img src={Pagee} alt=""/>
							<p>空调滤网积尘难洗</p>
						</li>
						<li><img src={Pagef} alt=""/>
							<p>门吸损坏</p>
						</li>
						<li><img src={Pageg} alt=""/>
							<p>铰链、导轨损坏</p>
						</li>
						<li><img src={Pageh} alt=""/>
							<p>墙面成块脱落</p>
						</li>
					</ul>
				</div>
				<div className='rights'>
					<h3>牛匠到家<img src={Five}></img>大权益</h3>
					<h5>解决您的修缮困扰</h5>
					<ul>
						<li>
							<div className="left"><img src={Img108} alt=""/></div>
							<div className="right"><h4>108项维修安装项目</h4><span>包含安装、疏通、拆除、更换等服务</span></div></li>
						<li>
							<div className="left"><img src={Good} alt=""/></div>
							<div className="right"><h4>专业正规有保障</h4><span>专业技师技术过硬、严格规范管理机制、高效保质服务体系</span></div></li>
						<li>
							<div className="left"><img src={Free} alt=""/></div>
							<div className="right"><h4>买送装一站式，正品保障</h4><span>维修、安装、材料帮买，一站式服务，品质保障、价格透明</span></div></li>
						<li>
							<div className="left"><img src={Green} alt=""/></div>
							<div className="right"><h4>安全环保</h4><span>选材环保，安全可靠，居家生活更健康</span></div></li>
						<li>
							<div className="left"><img src={Grail} alt=""/></div>
							<div className="right"><h4>VIP专属客服</h4><span>一对一客服，快速响应</span></div></li>
					</ul>
				</div>
				<div className="service">
					<div className="title flexjc">
						<img src={DD} alt=""/>
						<h1>好服务 才是真牛匠</h1>
						<img src={DD} alt=""/>
					</div>
					<div className="compare">
						<span>普通物业或个体维修</span><span>牛匠到家</span>
					</div>
					<ul>
						<li><img src={Page1} alt=""/>
							<p className='sjb'>自己买材料</p>
							<p className='sjb'>费时费力跑断腿</p>
						</li>
						<li><img src={Page4} alt=""/>
							<p>买送装一站式服务</p>
						</li>
						<li><img src={Page2} alt=""/>
							<p>偷工减料 胡乱加价</p>
						</li>
						<li><img src={Page5} alt=""/>
							<p className='sjb'>门店材料 价格透明</p>
							<p className='sjb'>品质保障</p>
						</li>
						<li><img src={Page3} alt=""/>
							<p>工人分包制 问责无处寻</p>
						</li>
						<li><img src={Page6} alt=""/>
							<p className='sjb'>注册认证技师</p>
							<p className='sjb'>专业安全</p>
						</li>
					</ul>
				</div>
				<div className="service-item">
					<div className="title flexjc">
						<img src={DD} alt=""/>
						<h1>服务项目</h1>
						<img src={DD} alt=""/>
					</div>
					<div className="sub">
						<Carousel autoGenerateStyleTag={false} renderBottomCenterControls={(e)=>{
							let dots = []
							for(let i = 0;i<e.slideCount;i++){
								dots.push(i)
							}
							return (<div className="dots">
								{dots.map((dot,index)=>(<span key={index} className={index === e.currentSlide ? 'current': ''}/>))}
							</div>)
						}}>
							{this.state.categoryList && this.state.categoryList.map((item,i)=>{
								return (
									<div className='ssub' key={i}>
										<h3>{item.categoryName}</h3>
										<ul>
											{item.productList && item.productList.length>0 && item.productList.map((item,i)=>{
												return <li key={i}>{item.itemName}</li>
											}
											)}
											{/*{item.productList && item.productList.length> 0 && this.isEven(item.productList.length) && <li/>}*/}
										</ul>
									
									</div>
								)
							})}
						</Carousel>
						
					</div>
				</div>
				<div className="info">
					<div className="title flexjc">
						<img src={DD} alt=""/>
						<h1>服务说明</h1>
						<img src={DD} alt=""/>
					</div>
					
					<div className='info-ins'>
						<ul>
							<li><img src={Tag} alt="tag"/><span>正常订单服务时间为9:00-18:00；按照双方约定时间上门，春节期间暂不提供服务</span></li>
							<li><img src={Tag} alt="tag"/><span>加急订单服务时间为9:00-23:00；两小时内上门</span></li>
							<li><img src={Tag} alt="tag"/><span>北京服务区域：六环以内</span></li>
							<li><img src={Tag} alt="tag"/><span>上海服务区域：全区域覆盖</span></li>
							<li>
								<img src={Tag} alt="tag"/>
								<span>
									<p>疫情期间修缮工程师上门服务规范承诺：</p>
									<p>1. 上门服务佩戴口罩</p>
									<p>2. 进门服务佩戴一次性鞋套</p>
									<p>3. 主动告知个人健康状况</p>
									<p>4. 施工完毕施工区域清洁</p>
									<p>5. 上门服务人员非疫区人员，携带证件</p>
								</span>
							</li>
						</ul>
					</div>
				</div>
				{ this.state.title != 'send' && <div className="create" onClick={this.download}>
					{/*199元/年 立即开通*/}
				</div>}
				{
					this.equal(this.state.type,'miniProgram') && this.state.title == 'send' && <div className="send" onClick={this.download}>
						{/*199元/年 立即开通*/}
						领取
					</div>
				}
			</div>
		);
	}
	
}