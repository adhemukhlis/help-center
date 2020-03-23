import React, { Component } from 'react';
import {
	Form,
	Card,
	PageHeader,
	Checkbox,
	Input,
	Divider,
	Button,
	Row,
	Col,
	Select,
	InputNumber
} from 'antd';
import { ContainerLapor, StyleLogo } from "./style";
import Logo from "../logo.svg";
class Lapor extends Component {
	state = {
		unitUmur: 'thn'
	};
	onChange = ( e ) => {
		this.setState({
			unitUmur: e.target.checked
				? 'bln'
				: 'thn'
		});
		console.log( `checked = ${ e.target.checked }` )
	}
	render( ) {
		const { unitUmur } = this.state;
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
		const kabupaten = [ 'Banyumas' ];
		const gejala = [
			'demam',
			'menggigil',
			'nyeri',
			'kelelahan',
			'bersin-bersin',
			'batuk',
			'pilek',
			'pusing',
			'radang tenggorokan',
			'sesak nafas',
			'diare'
		];
		return (
			<div>
				<PageHeader onBack={ () => window.history.back()} title="Lapor" subTitle="form lapor warga"/>
				<div style={ContainerLapor}>
					<img alt="example" style={StyleLogo} src={Logo}/>
					<div style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column'
					}}>
						<Form layout="vertical" >
							<Card title="Data pelapor">
								<Form.Item label="Nama pelapor">
									<Input size="large"/>
								</Form.Item>
								<Form.Item label="NIK">
									<Input size="large"/>
								</Form.Item>
								<Form.Item label="Alamat">
									<Input size="large"/>
								</Form.Item>
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
								<Form.Item >
									<Select size="large" placeholder="Kabupaten">
										<Select.OptGroup label="Kabupaten">{kabupaten.map(( data ) => {
												return <Select.Option key={data} value={data}>{data}</Select.Option>
											})}</Select.OptGroup>
									</Select>
								</Form.Item>
								<Form.Item label="No. Telpon">
									<Input size="large"/>
								</Form.Item>
							</Card>
							<Divider dashed/>
							<Card title="Data warga sakit">
								<Form.Item label="Nama warga sakit">
									<Input size="large"/>
								</Form.Item>
								<Form.Item label="Umur" extra="beri centang jika warga sakit berumur dibawah satu tahun, biarkan jika lebih dari satu tahun.">
									<Row gutter={16}>
										<Col span={8}><InputNumber size="large" formatter={value => `${ value } ${ unitUmur }`} parser={value => value.replace( `${ unitUmur }`, '' )} min={1} defaultValue={1} onChange={( e ) => console.log( e )}/></Col>
										<Col span={16}>
											<Checkbox onChange={this.onChange}>umur dibawah 1 thn</Checkbox>
										</Col>
									</Row>
								</Form.Item>
								<Form.Item label="Keluhan" extra="input keluhan sesuai pilihan, tambah keluhanan lain dengan tulis dan dipisah dengan tanda koma `,` .">
									<Select size="large" mode="tags" style={{
										width: '100%'
									}} placeholder="keluhan" onChange={( value ) => console.log( `selected ${ value }` )} tokenSeparators={[ ',' ]}>{gejala.map(( data ) => {
											return <Select.Option key={data}>{data}</Select.Option>
										})}</Select>
								</Form.Item>
							</Card>
							<Divider dashed/>
							<Form.Item >
								<Row gutter={16}>
									<Col span={6}>
										<Button block type="dashed" size="large">Batal</Button>
									</Col>
									<Col span={18}>
										<Button block type="primary" size="large">Kirim</Button>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}
export default Lapor;