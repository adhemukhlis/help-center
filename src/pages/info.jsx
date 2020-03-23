import React, { Component } from 'react';
import { Form, Card, PageHeader, Input, Divider } from 'antd';
import { ContainerInfo, StyleLogo } from "./style";
import Logo from "../logo.svg";
class Info extends Component {
	render( ) {
		return (
			<div>
				<PageHeader onBack={( ) => window.history.back( )} title="Info" subTitle="Info Rumah Sakit dan Puskesmas"/>
				<div style={ContainerInfo}>
					<img alt="example" style={StyleLogo} src={Logo}/>
					<div style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column'
					}}>
						<Form layout="vertical">
							<Card title="Info Rumah Sakit dan Puskesmas">
								<Form.Item label="Cari">
									<Input.Search placeholder="cari" onSearch={value => console.log( value )} enterButton/>
								</Form.Item>
							</Card>
							<Divider dashed/>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}
export default Info;