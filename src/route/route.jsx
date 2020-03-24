import React, { Component } from 'react';
import { devmode } from "../config/config";
import BaseLayout from "./base";
import { DisableReactDevTools } from "../lib/devtool-killer";
class Route extends Component {
	componentWillMount( ) {
		DisableReactDevTools( !devmode )
	}
	render( ) {
		return ( <BaseLayout/> )
	}
}
export default Route;