import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './index.action';
import Toast from '../../components/prompt/toast';
import './index.less';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)(Home);