import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from "../pages/home";
import Lapor from "../pages/lapor";
import Pantau from '../pages/pantau'
import Info from '../pages/info'
import PATH from "./path";
class Base extends Component {
	constructor( props ) {
		super( props );
		this.state = {}
	}
	render( ) {
		return (
			<div>
				<Route path={PATH.root} exact component= { ( ) =><Home/>}/>
				<Route path={PATH.lapor} component= { ( ) =><Lapor/>}/>
				<Route path={PATH.pantau} component= { ( ) =><Pantau/>}/>
				<Route path={PATH.info} component= { ( ) =><Info/>}/>
			</div>
		)
	}
}
export default Base;