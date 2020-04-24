import React,{Component} from 'react'
import './index.less'
import { getInitData } from './api'
import { createForm, formShape } from 'rc-form';
import { InputItem,List,Picker,Button,WhiteSpace,Toast,NoticeBar} from 'antd-mobile'


@createForm()
export default class Marketing extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			shop: [],
			department: [],
		}
	}
	
	
	componentDidMount() {
		this._getInitData()
		this.autoFocusInst.focus();
		
	}
	_submit = () => {
		this.props.form.validateFields((err,res)=>{
			if(err){
				Toast.info('姓名为必填项!',1)
				return
			}
			if(res.shop && res.shop[0] != -1 || res.department && res.department[0] != -1){
				let currShop = this.state.shop && this.state.shop.filter(s=>s.shopCode === (res.shop && res.shop[0]))
				let shopCode = currShop.length && currShop[0]['shopCode']
				let shopName = currShop.length && currShop[0]['name']
				let currDept = this.state.department && this.state.department.filter(d=>d.code === (res.department && res.department[0]))
				let departmentCode = currDept.length && currDept[0]['code']
				let departmentName = currDept.length && currDept[0]['name']

				let url = '/extendLH?staffName='+res.name + 
				'&shopCode='+shopCode+'&shopName='+shopName+ 
				'&departmentCode='+departmentCode+'&departmentName='+departmentName
				window.location.href = url
			}else{
				return Toast.info('门店或者部门必须选择一项!',1.5)
			}
			
		})
	}
	_getInitData = () => {
		fetch(getInitData).then(res=>res.json()).then(res=>{
			let {shop,department} = res.result.data
			shop.length && shop.unshift({
				name: '请选择',
				shopCode: -1
			})
			department.length && department.unshift({
				name: '请选择',
				code: -1
			})
			this.setState({
				shop: shop || [],
				department: department || []
			})
		})
	}
	
	render() {
		const { getFieldProps, getFieldError } = this.props.form;
		return <div className='marketing'>
			<List renderHeader={() => '请填写基本信息获取专属二维码'}>
				<InputItem
					{...getFieldProps('name',{
						rules:[{required:true}]
					})}
					clear
					placeholder="请填写姓名"
					ref={el => this.autoFocusInst = el}
				>姓名</InputItem>
				
				<Picker data={this.state.shop.map(s=>{
					return {
						label: s.name,
						value: s.shopCode
					}
				})} cols={1} {...getFieldProps('shop')} className="forss">
					<List.Item arrow="horizontal">门店</List.Item>
				</Picker>
				<NoticeBar  marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
				门店员工选择门店
    		</NoticeBar>
				<Picker data={this.state.department.map(s=>{
					return {
						label: s.name,
						value: s.code
					}
				})} cols={1} {...getFieldProps('department')} className="forss">
					<List.Item arrow="horizontal">部门</List.Item>
				</Picker>
				<NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
				总部或区域员工选择部门
    		</NoticeBar>
				<NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
				门店或部门必须填写一项
    		</NoticeBar>
				<NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
				信息必须正确，否则无法正确统计到本人的推广记录
    		</NoticeBar>
				<Button type="primary" style={{margin: '.2rem 2rem'}} onClick={()=>{
					this._submit()
				}}>提交</Button>
				
			</List>
			
			
			
		</div>
	}
}