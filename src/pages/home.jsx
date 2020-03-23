import React, { Component } from 'react';
import DelayLink from 'react-delay-link';
import PATH from "../route/path";
import { ver } from '../config/config';
import { IcDuotoneBong } from "../icons/react-icon-svg";
import Button3d from "../3d-button/3d-button";
import { ContainerHome, StyleLogo, GGrid, GGridItem } from "./style";
import Logo from "../logo.svg";
class Home extends Component {
	render( ) {
		return (
			<div style={ContainerHome}>
				<img alt="example" style={StyleLogo} src={Logo}/>
				<div style={GGrid}>
					<DelayLink delay={400} to={PATH.lapor} clickAction={( ) => console.log( "link clicked" )} replace={false}>
						<Button3d style={GGridItem}><IcDuotoneBong style={{
				marginBottom: '2vw'
			}} fill="#555"/>Lapor</Button3d>
					</DelayLink>
					<DelayLink delay={400} to={PATH.pantau} clickAction={( ) => console.log( "link clicked" )} replace={false}>
						<Button3d style={GGridItem}><IcDuotoneBong style={{
				marginBottom: '2vw'
			}} fill="#555"/>Pantau</Button3d>
					</DelayLink>
					<DelayLink delay={400} to={PATH.info} clickAction={( ) => console.log( "link clicked" )} replace={false}>
						<Button3d style={GGridItem}><IcDuotoneBong style={{
				marginBottom: '2vw'
			}} fill="#555"/>Info</Button3d>
					</DelayLink>
				</div>
				<code style={{
					position: 'absolute',
					bottom: '1vh'
				}}>{'build ' + ver}</code>
			</div>
		)
	}
}
export default Home;