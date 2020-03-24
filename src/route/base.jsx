import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Lapor from '../pages/lapor/lapor';
import Pantau from '../pages/pantau/pantau';
import Info from '../pages/info/info';
import PATH from './path';
class Base extends Component {
	constructor( props ) {
		super( props );
		this.state = {}
	}
	render( ) {
		return (
			<HashRouter>
				<Route path={PATH.root} exact component= { ( ) =><Home/>}/>
				<Route path={PATH.lapor} component= { ( ) =><Lapor/>}/>
				<Route path={PATH.pantau} component= { ( ) =><Pantau/>}/>
				<Route path={PATH.info} component= { ( ) =><Info/>}/>
			</HashRouter>
		)
	}
}
export default Base;