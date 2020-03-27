import React, { Component } from 'react';
import { ver } from '../../config/config';
import HomeButton from "./home-button";
import { ContainerHome, StyleLogo, GGrid, StyleFooter, PowerLogo, StyleTitle } from "../style";
import Logo from "../../chart-network.svg";
import LogoItt from "../../logo-itt.png";
class Home extends Component {
	render( ) {
		return (
			<div style={ContainerHome}>
				<img alt="logo" style={StyleLogo} src={Logo}/>
				<h2 style={StyleTitle}>Kampung Siaga Covid-19</h2>
				<div style={GGrid}>
					<HomeButton/>
				</div>
				<code style={StyleFooter}><img alt="logo-itt" src={LogoItt} style={PowerLogo}/><br/>{'COPYRIGHT © 2020. Kelompok Keahlian Rekayasa Perangkat Lunak dan Multimedia Fakultas Informatika Institut Teknologi Telkom Purwokerto. build ' + ver}</code>
			</div>
		)
	}
}
export default Home;