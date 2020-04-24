import React, {Component} from 'react'
import './index.less'

export default class Modal extends Component {
	
	constructor(props) {
		super(props);
		
	}
	
	componentDidMount() {
		this.props.initCallBack && this.props.initCallBack()
	}
	
	render() {

		let {onClose, visible, title, customButton} = this.props
		
		return <div className={ visible.toString() === 'true' ? 'bl-modal visible' : 'bl-modal'}>
			<div className="bl-modal-wrapper">
				<div className="bl-title">{title}</div>
				<div className="bl-content">
					{this.props.children}
				</div>
				<div className="bl-footer">
					{customButton ? customButton() : (customButton === null ? '' : <button onClick={() => onClose()}>我知道了</button>)}
				</div>
			</div>
		</div>
	}
	
}