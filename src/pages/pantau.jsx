import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
	Form,
	Card,
	PageHeader,
	Input,
	Divider,
	Row,
	Col,
	Select,
} from 'antd';
import { ContainerPantau, StyleLogo } from "./style";
import Logo from "../logo.svg";
const data = {
	labels: [
		'Positif : 124', 'Sembuh : 124', 'Meninggal : 124', 'Pantauan :124'
	],
	datasets: [
		{
			data: [
				124, 124,124,124
			],
			backgroundColor: [
				'#99FF63', '#6DC0FF','#FF6385','#FFE563'
			],
			hoverBackgroundColor: [ '#7DFF38', '#45AEFF','#FF3863','#FFDE38' ]
		}
	],
	options: {
		legend: {
			position: 'bottom'
		}
	}
}
class Pantau extends Component {
	render( ) {
		const rt = [ '001', '002', '003', '004' ];
		const rw = [ '01', '02', '03', '04' ];
		const kelurahan = [
			'Berkoh',
			'Karangklesem',
			'Karangpucung',
			'Purwokerto Kidul',
			'Purwokerto Kulon',
			'TanjungTeluk'
		];
		const kecamatan = [ 'Purwokerto Selatan' ];
		return (
			<div>
				<PageHeader onBack={( ) => window.history.back( )} title="Pantau" subTitle="pantau data wilayah"/>
				<div style={ContainerPantau}>
					<img alt="example" style={StyleLogo} src={Logo}/>
					<div style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column'
					}}>
						<Form layout="vertical">
							<Card>
								<Form.Item label="Cari">
									<Input.Search placeholder="cari daerah" onSearch={value => console.log( value )} enterButton/>
								</Form.Item>
								<Form.Item label="Filter berdasarkan">
									<Row gutter={16}>
										<Col span={12}>
											<Form.Item >
												<Select size="large" placeholder="RT">
													<Select.OptGroup label="RT">{rt.map(( data ) => {
															return <Select.Option key={data} value={data}>{data}</Select.Option>
														})}</Select.OptGroup>
												</Select>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item >
												<Select size="large" placeholder="RW">
													<Select.OptGroup label="RW">{rw.map(( data ) => {
															return <Select.Option key={data} value={data}>{data}</Select.Option>
														})}</Select.OptGroup>
												</Select>
											</Form.Item>
										</Col>
									</Row>
									<Form.Item >
										<Select size="large" placeholder="Kelurahan">
											<Select.OptGroup label="Kelurahan">{kelurahan.map(( data ) => {
													return <Select.Option key={data} value={data}>{data}</Select.Option>
												})}</Select.OptGroup>
										</Select>
									</Form.Item>
									<Form.Item >
										<Select size="large" placeholder="Kecamatan">
											<Select.OptGroup label="Kecamatan">{kecamatan.map(( data ) => {
													return <Select.Option key={data} value={data}>{data}</Select.Option>
												})}</Select.OptGroup>
										</Select>
									</Form.Item>
								</Form.Item>
							</Card>
							<Divider dashed/>
						</Form>
						<div style={{
							width: '100%',
							height: '80vw'
						}}>
							<Doughnut data={data} options={{
								legend: {
									position: 'right'
								}
							}}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Pantau;