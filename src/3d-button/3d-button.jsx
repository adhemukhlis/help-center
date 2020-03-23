import React from 'react';
import './3d-button.css';
const Button3d = props => (
	<div id='button3d' {...props}>{props.children}</div>
);
export default Button3d;