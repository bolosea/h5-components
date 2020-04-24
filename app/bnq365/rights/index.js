import React, {Component} from 'react'
import * as Util from '../../../util/index';
import {getProductList} from '../api'
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
import Book from './imgs/book-history.png'
import wx from "weixin-js-sdk";
import { postToApp } from '../../../hybrid/hybrid'


export default class Rights extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			categoryList: void 0,
			isShow: void 0,
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
			categoryList: data.result.data.categoryList
		})
	}
	
	componentDidMount() {
		let type = Util.getUrlArg('type')
		let isShow = Util.getUrlArg('isShow')
		console.log('type', type)
		this.setState({
			type,
			isShow
		})
		
		this._getProductList()
		this._addTouchListener()
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
		let params = Util.getUrlArg('params')
		if(type == 'miniProgram'){
			wx.miniProgram.navigateTo({
				url:  '/pages/liveHome365/subscribeRecord/subscribeRecord?params=' + params
			})
		}else if (type == 'app') {
			postToApp('LiveHome365','toSubscribeRecord',params)
			
		}
	}

	_isEven = (num) => {
		return num % 2 !== 0
	}
	render() {
		return (
			<div className={this.equal('app', this.state.type) ? 'app rights' : 'rights'}>
				<div className="nav">
					{/*<p className='nav-info'>全年10项免人工费、免上门费，材料费自理</p>*/}
				</div>
				<div className='rightss'>
					<h3>牛匠到家<img src={Five}></img>大权益</h3>
					<h5>解决您的修缮困扰</h5>
					<ul>
						<li>
							<div className="left"><img src={Img108} alt=""/></div>
							<div className="right"><h4>108项免费维修安装项目</h4><span>包含安装、疏通、拆除、更换等服务</span></div></li>
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
											{item.productList && item.productList.length>0 && item.productList.map((item,i)=>(
												<li key={i}>{item.itemName}</li>
											))}
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
					{/*{!this.equal('app',this.state.type) && <div className="create" onClick={this.download}>*/}
					{/*	199元/年 立即开通*/}
					{/*</div>}*/}

					{this.state.isShow && <div className="create" onClick={this.download}>
					{/*199元/年 立即开通*/}
				</div>}
				</div>
			</div>
		);
	}
	
}