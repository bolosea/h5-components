import React,{Component} from 'react'
import './index.less'
import home_big from './imgs.bak/icon_home_365_big@2x.png'
import love from './imgs.bak/love@2x.png'
import rown from './imgs.bak/rown@2x.png'
import shield from './imgs.bak/shield@2x.png'
import tag from './imgs.bak/tag_u@2x.png'
import * as Util from '../../../util/index';
import { getProductList } from '../api'

export default class Share extends Component{
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			categoryList: void 0
		}
	}
	_getProductList = async () => {
		console.log('getProductList111',getProductList)
		let data = await fetch(getProductList).then(res=>res.json())
		console.log('data',data,data.result.data.categoryList)
		this.setState({
			categoryList: data.result.data.categoryList
		})
	}
	componentDidMount() {
		let type = Util.getUrlArg('type')
		console.log('type',type)
		this.setState({
			type
		})
		
		this._getProductList()
	}
	
	//忽略大小写
	equal = (a,b) => {
		return a === b || a === b.toUpperCase() || a === b.toLowerCase()
	}
	
	download = () => {
		window.location.href = 'https://zt.web.bnq.com.cn/project/app_down.html'
	}
	
	render() {
		return (
			<div className={this.equal('app',this.state.type)? 'app share': 'share'}>
				<div className="header">
					<img src={home_big} alt="big"/>
					<h1>199元全年家居修缮服务</h1>
				</div>
				<ul className='ins'>
					<li><img src={love} alt="love"/><span>三大服务</span></li>
					<li><img src={rown} alt="rown"/><span>六大权益</span></li>
					<li><img src={shield} alt="shield"/><span>五大保障</span></li>
				</ul>
				<div className="ins-detail">
					<h4>全年10项免费修缮服务</h4>
					{this.state.categoryList && this.state.categoryList.map(item=>{
						return (
							<div className="content" key={item.id}>
								<h3 className="title" key={item.itemId}>{item.categoryName}</h3>
								<ul>
									{item.productList && item.productList.map(detail=>{
										return (
											<li key={detail.itemId}>{detail.itemName}</li>
										)
									})}
								</ul>
							</div>
						)
					})}
					<h4 className='service'>安居365服务说明</h4>
					<div className='service-ins'>
						<ul>
							<li><img src={tag} alt="tag"/><span>服务项目为以上限定范围内任选10项，不在所示服务范围内的项目，不提供维修服务。</span></li>
							<li><img src={tag} alt="tag"/><span>开通服务地址为修缮服务唯一服务地址，填写地址后，未享受服务可以修改地址，如果已经开始享受修缮服务，则地址不可更改。</span></li>
							<li><img src={tag} alt="tag"/><span>申请服务说明书，说明规则说明服务范围限定申请服务说明书说明规则说明服务范围，限定申请服务说明书说明规则说明服务范围限定</span></li>
							<li><img src={tag} alt="tag"/><span>申请服务说明书，说明规则说明服务范围限定申请服务说明书说明规则说明服务范围，限定申请服务说明书说明规则说明服务范围限定</span></li>
						</ul>
					</div>
					{!this.equal('app',this.state.type) && <div className="create" onClick={this.download}>
						下载APP 立即订阅
					</div>}
				</div>
			</div>
		);
	}
	
}