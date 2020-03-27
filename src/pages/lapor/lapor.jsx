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
import Logo from "../../chart-network.svg";
import { GetProvinsi, GetKabKot, GetKecamatan, GetKelurahan } from "../../lib/regional";
class Lapor extends Component {
	state = {
		unitUmur: 'thn',
		provinsi: [],
		provinsi_loaded: false,
		kabupaten: [],
		kabupaten_loaded: false,
		kecamatan: [],
		kecamatan_loaded: false,
		kelurahan: [],
		kelurahan_loaded: false,
		form_nama_pelapor: '',
		form_nik: '',
		form_alamat: '',
		form_rt: '',
		form_rw: '',
		form_provinsi: null,
		form_kelurahan: null,
		form_kecamatan: null,
		form_kabupaten: null,
		form_telp: '',
		form_nama_warga_sakit: '',
		form_umur: 1,
		form_keluhan: ''
	};
	componentDidMount( ) {
		GetProvinsi(( data ) => {
			this.setState({ provinsi: data, provinsi_loaded: true })
		})
	}
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
			if ( name === "form_provinsi" ) {
				this.setState({ kabupaten_loaded: false, form_kabupaten: null });
				GetKabKot(value, ( data ) => this.setState({ kabupaten: data, kabupaten_loaded: true }))
			} else if ( name === "form_kabupaten" ) {
				this.setState({ kecamatan_loaded: false, form_kecamatan: null });
				GetKecamatan(value, ( data ) => this.setState({ kecamatan: data, kecamatan_loaded: true }))
			} else if ( name === "form_kecamatan" ) {
				this.setState({ kelurahan_loaded: false, form_kelurahan: null });
				GetKelurahan(value, ( data ) => this.setState({ kelurahan: data, kelurahan_loaded: true }))
			}
			this.setState({ [ name ]: value })
		}
	}
	render( ) {
		const {
			unitUmur,
			provinsi,
			provinsi_loaded,
			kabupaten,
			kabupaten_loaded,
			kecamatan,
			kecamatan_loaded,
			kelurahan,
			kelurahan_loaded,
			form_umur,
			form_provinsi,
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
									<Select size="large" {...(form_provinsi!==null ? {value: form_provinsi} : {})} placeholder="Provinsi" onChange={( value ) => this.onSelectChange( "form_provinsi", value )} loading={!provinsi_loaded}>
										<Select.OptGroup label="Provinsi">{provinsi.map(( data ) => {
												return <Select.Option key={data.id + data.nama} value={data.id}>{data.name}</Select.Option>
											})}</Select.OptGroup>
									</Select>
								</Form.Item>
								<Form.Item >
									<Select size="large" {...(form_kabupaten!==null ? {value: form_kabupaten} : {})} placeholder="Kabupaten" onChange={( value ) => this.onSelectChange( "form_kabupaten", value )} loading={!kabupaten_loaded}>
										<Select.OptGroup label="Kabupaten">{kabupaten.map(( data ) => {
												return <Select.Option key={data.id + data.name} value={data.id}>{data.name}</Select.Option>
											})}</Select.OptGroup>
									</Select>
								</Form.Item>
								<Form.Item >
									<Select size="large" {...(form_kecamatan!==null ? {value: form_kecamatan} : {})} placeholder="Kecamatan" onChange={( value ) => this.onSelectChange( "form_kecamatan", value )} loading={!kecamatan_loaded}>
										<Select.OptGroup label="Kecamatan">{kecamatan.map(( data ) => {
												return <Select.Option key={data.id + data.name} value={data.id}>{data.name}</Select.Option>
											})}</Select.OptGroup>
									</Select>
								</Form.Item>
								<Form.Item >
									<Select size="large" {...(form_kelurahan!==null ? {value: form_kelurahan} : {})} placeholder="Kelurahan" onChange={( value ) => this.onSelectChange( "form_kelurahan", value )} loading={!kelurahan_loaded}>
										<Select.OptGroup label="Kelurahan">{kelurahan.map(( data ) => {
												return <Select.Option key={data.id + data.name} value={data.id}>{data.name}</Select.Option>
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