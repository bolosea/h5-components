import React, {Component, Fragment} from 'react'
import {withSelect} from "../select";
import './index.less'

export default class FilterModal extends Component {
	
	_handleClick = (e) => {
		console.dir(e.target);
		if(e.target.className.split(' ').includes('filter-modal')){
			this.props.toggleFilter();
		}
	}
	render() {
		return (
			<div className={this.props.visible?'filter-modal show' : 'filter-modal'}
				onClick = {e => this._handleClick(e)}>
				<div className="filter-modal-wraper">
					<Filter {...this.props}/>
				</div>
			</div>
		)
	}
}


@withSelect
class Filter extends Component {
	
	_search = () => {
		console.log(this.props);
		this.props.toggleFilter(this.props.selectData.params)
	}
	_reset = () => {

		console.log(this.props);
		this.props.toggleFilter({},()=>{
			this.props.handleReset()
		})
	}
	
	render() {
		return <div className="filter">
			<div className="footer">
				<button onClick={() => this._reset()}>重置</button>
				<button onClick={() => this._search()}>确定</button>
			</div>
		</div>
	}
}
