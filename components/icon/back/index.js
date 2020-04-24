import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

const BackIcon = ({ clickHandle }) => {
	return (
		// <div className="backIcon">
			<span className="u-icon-arr" onClick={clickHandle}></span>
		// </div>
	);
}

BackIcon.propTypes = {
	clickHandle: PropTypes.func
}

export default BackIcon;