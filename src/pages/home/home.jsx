import React, { Component } from 'react';
import { ver } from '../../config/config';
import HomeButton from "./home-button";
import { ContainerHome, StyleLogo, GGrid, StyleFooter } from "../style";
import Logo from "../../logo.svg";
class Home extends Component {
	render( ) {
		return (
			<div style={ContainerHome}>
				<img alt="example" style={StyleLogo} src={Logo}/>
				<div style={GGrid}>
					<HomeButton/>
				</div>
				<code style={StyleFooter}>{'build ' + ver}</code>
			</div>
		)
	}
}
export default Home;