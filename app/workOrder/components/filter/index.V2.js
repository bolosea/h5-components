import React, {Component, Fragment} from 'react'
import {withSelect} from "../select";
import './index.V2.less'
import {Select} from '../select'
import {createForm} from 'rc-form'
import New from '../new'


export default class FilterModal extends Component {
	
	
	_handleClick = (e) => {
		console.dir(e.target)
		if(e.target.className.split(' ').includes('filter-modal')){
			this.props.toggleFilter()
		}
	}
	
	render() {
		return (
			<div onClick={(e)=>{
				this._handleClick(e)
			}} className={this.props.visible?'filter-modal show' : 'filter-modal'}>
				<div className="filter-modal-wraper">
					<Filter {...this.props}/>
				</div>
			</div>
		)
	}
}


class Filter extends Component {
	constructor(props) {
		super(props);
	}
	
	_search = (form) => {
		form.validateFields((error, values) => {
			if (error) {
				console.log('error: ', error);
				return;
			}
			Object.keys(values).forEach(key=>{
				if(values[key]){
					if(Object.prototype.toString.call(values[key]) === '[object Object]'){
						Object.keys(values[key]).forEach(k=>values[k] = values[key][k])
						delete values[key]
					}else if(typeof values[key] === "boolean"){
						values[key] = + values[key]
					}
				}else{
					delete values[key]
				}
			})
			console.log('values',values)
			this.props.handleSearch(values)
		});
	}
	
	_reset = (form) => {
		this.props.filters.forEach(ft=>{
			if(ft.type === 'select' || ft.type === 'rangepicker'){
				ft.isReset = true
				setTimeout(()=>{
					console.log('ft',ft)
					ft.isReset = false
				},0)
			}
			form.setFieldsValue({
				[ft.id]: ''
			})
		})
		console.log('reset...')
		this.props.handleReset()
		
	}

	render() {
		return <div className="filter">
			<New data={this.props.filters} customActions={(form)=>(
				<div className="footer">
					<button onClick={() => this._reset(form)}>重置</button>
					<button onClick={() => this._search(form)}>确定</button>
				</div>
			)
			}/>
			
		</div>
	}
}
