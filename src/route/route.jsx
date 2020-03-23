import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import BaseLayout from "./base";
import { DisableReactDevTools } from "../lib/devtool-killer";
class Route extends Component {
	componentWillMount( ) {
		DisableReactDevTools( false )
	}
	render( ) {
		return (
			<HashRouter>
				<BaseLayout/>
			</HashRouter>
		)
	}
}
export default Route;