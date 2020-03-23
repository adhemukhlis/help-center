import React, { Component } from 'react';
import { IcDuotoneBong } from "./icons/react-icon-svg";
import "./3d-button/grid.css"
import Button3d from "./3d-button/3d-button";
import Logo from "./logo.svg";
import { Card, Row, Col } from 'antd';
import 'antd/es/card/style/css';
const { Meta } = Card;
class App extends Component {
	render( ) {
		return (
			<div style={{
				minHeight: '100vh',
				display: 'flex',
				flex: '1',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				flexDirection: 'column',
				backgroundColor:'#f5f5f5',
				padding: '24px'
			}}>
				<img alt="example" style={{
					width: '36vw'
				}} src={Logo}/>
				<div className="cgrid">
					<Button3d className="cgrid-item"><IcDuotoneBong style={{marginBottom:'2vw'}} fill="#555"/>Lapor</Button3d>
					<Button3d className="cgrid-item"><IcDuotoneBong style={{marginBottom:'2vw'}} fill="#555"/>Pantau</Button3d>
					<Button3d className="cgrid-item"><IcDuotoneBong style={{marginBottom:'2vw'}} fill="#555"/>Info</Button3d>
				</div>
			</div>
		)
	}
}
export default App;