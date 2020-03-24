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
import { ContainerLapor, StyleLogo } from "../style";
import Logo from "../../logo.svg";
import { data_kabupaten, data_kecamatan, data_kelurahan } from "../../data-kota/data-kota";
class Lapor extends Component {
	state = {
		unitUmur: 'thn',
		kabupaten: data_kabupaten,
		kecamatan: data_kecamatan[data_kabupaten[0]],
		kelurahan: data_kelurahan[data_kecamatan[data_kabupaten[0]][0 ]],
		form_nama_pelapor: '',
		form_nik: '',
		form_alamat: '',
		form_rt: '',
		form_rw: '',
		form_kelurahan: data_kelurahan[data_kecamatan[data_kabupaten[0]][0 ]][0],
		form_kecamatan: data_kecamatan[data_kabupaten[0]][0],
		form_kabupaten: data_kabupaten[0],
		form_telp: '',
		form_nama_warga_sakit: '',
		form_umur: 1,
		form_keluhan: ''
	};
	onCheckChange = ( e ) => {
		this.setState({
			unitUmur: e.target.checked
				? 'bln'
				: 'thn'
		});
		console.log( `checked = ${ e.target.checked }` )
	}
	onChange = ( e ) => {
		this.setState({
			[ e.target.name ]: e.target.value
		})
	}
	onSelectChange = ( name, value ) => {
		if ( name === "form_keluhan" ) {
			const keluhan = value.join( );
			this.setState({ [ name ]: keluhan });
			console.log(keluhan.split( ',' ))
		} else {
			this.setState({ [ name ]: value })
		}
	}
	handleKabupatenChange = value => {
		this.setState({
			kecamatan: data_kecamatan[value],
			kelurahan: data_kelurahan[data_kecamatan[value][0 ]],
			form_kecamatan: data_kecamatan[value][0],
			form_kelurahan: data_kelurahan[data_kecamatan[value][0 ]][0],
			form_kabupaten: value
		})
	};
	handleKecamatanChange = value => {
		this.setState({ kelurahan: data_kelurahan[value], form_kelurahan: data_kelurahan[value][0], form_kecamatan: value })
	};
	render( ) {
		const {
			unitUmur,
			kabupaten,
			kecamatan,
			kelurahan,
			form_umur,
			form_kabupaten,
			form_kecamatan,
			form_kelurahan
		} = this.state;
		const rt = [ '001', '002', '003', '004' ];
		const rw = [ '01', '02', '03', '04' ];
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
				<PageHeader onBack={( ) => window.history.back( )} title="Lapor" subTitle="form lapor warga"/>
				<div style={ContainerLapor}>
					<img alt="example" style={StyleLogo} src={Logo}/>
					<div style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column'
					}}>
						<Form layout="vertical">
							<Card title="Data pelapor">
								<Form.Item label="Nama pelapor">
									<Input size="large" name="form_nama_pelapor" onChange={this.onChange}/>
								</Form.Item>
								<Form.Item label="NIK">
									<Input type="number" size="large" name="form_nik" onChange={this.onChange} onKeyDown={( e ) => e.key === 'e' && e.preventDefault( )}/>
								</Form.Item>
								<Form.Item label="Alamat">
									<Input.TextArea size="large" name="form_alamat" onChange={this.onChange}/>
								</Form.Item>
								<Row gutter={16}>
									<Col span={12}>
										<Form.Item >
											<Select size="large" placeholder="RT" onChange={( value ) => this.onSelectChange( "form_rt", value )}>
												<Select.OptGroup label="RT">{rt.map(( data ) => {
														return <Select.Option key={data} value={data}>{data}</Select.Option>
													})}</Select.OptGroup>
											</Select>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item >
											<Select size="large" placeholder="RW" onChange={( value ) => this.onSelectChange( "form_rw", value )}>
												<Select.OptGroup label="RW">{rw.map(( data ) => {
														return <Select.Option key={data} value={data}>{data}</Select.Option>
													})}</Select.OptGroup>
											</Select>
										</Form.Item>
									</Col>
								</Row>
								<Form.Item >
									<Select size="large" value={form_kelurahan} placeholder="Kelurahan" onChange={( value ) => this.onSelectChange( "form_kelurahan", value )}>
										<Select.OptGroup label="Kelurahan">{kelurahan.map(( data ) => {
												return <Select.Option key={data} value={data}>{data}</Select.Option>
											})}</Select.OptGroup>
									</Select>
								</Form.Item>
								<Form.Item >
									<Select size="large" value={form_kecamatan} placeholder="Kecamatan" onChange={this.handleKecamatanChange}>
										<Select.OptGroup label="Kecamatan">{kecamatan.map(( data ) => {
												return <Select.Option key={data} value={data}>{data}</Select.Option>
											})}</Select.OptGroup>
									</Select>
								</Form.Item>
								<Form.Item >
									<Select size="large" defaultValue={form_kabupaten} placeholder="Kabupaten" onChange={this.handleKabupatenChange}>
										<Select.OptGroup label="Kabupaten">{kabupaten.map(( data ) => {
												return <Select.Option key={data} value={data}>{data}</Select.Option>
											})}</Select.OptGroup>
									</Select>
								</Form.Item>
								<Form.Item label="No. Telpon">
									<Input size="large" name="form_telp" onChange={this.onChange}/>
								</Form.Item>
							</Card>
							<Divider dashed/>
							<Card title="Data warga sakit">
								<Form.Item label="Nama warga sakit">
									<Input size="large" name="form_nama_warga_sakit" onChange={this.onChange}/>
								</Form.Item>
								<Form.Item label="Umur" extra="beri centang jika warga sakit berumur dibawah satu tahun.">
									<Row gutter={16}>
										<Col span={8}>
											<InputNumber size="large" value={form_umur} min={1} defaultValue={1} max={unitUmur === "bln"
												? 11
												: 120} onChange={( value ) => this.onSelectChange( "form_umur", value )} onKeyDown={( e ) => e.key === 'e' && e.preventDefault( )}/>
											<b>*{unitUmur}</b>
										</Col>
										<Col span={16}>
											<Checkbox onChange={this.onCheckChange}>umur dibawah 1 thn</Checkbox>
										</Col>
									</Row>
								</Form.Item>
								<Form.Item label="Keluhan" extra="input keluhan sesuai pilihan, tambah keluhan lain dan pisah dengan tanda koma `,` .">
									<Select size="large" mode="tags" style={{
										width: '100%'
									}} placeholder="keluhan" onChange={( value ) => this.onSelectChange( "form_keluhan", value )} tokenSeparators={[ ',' ]}>{gejala.map(( data ) => {
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