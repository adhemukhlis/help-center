import React, {Component} from 'react';
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
    Collapse,
    message,
    InputNumber
} from 'antd';
import {Redirect} from 'react-router-dom'
import {ContainerLapor, StyleLogo} from "../style";
import Logo from "../../chart-network.svg";
import {GetProvinsi, GetKabKot, GetKecamatan, GetKelurahan} from "../../lib/regional";
import {get_gps_location} from "../../lib/gps"
import {rootRef} from '../../firebaseRef/firebaseRef'
class Lapor extends Component {
    state = {
        redirect:false,
        unitUmur: 'thn',
        page_active: 0,
        nik_checking: false,
        data_loaded: false,
        nik_registered:false,
        provinsi: [],
        provinsi_loaded: false,
        kabupaten: [],
        kabupaten_loaded: false,
        kecamatan: [],
        kecamatan_loaded: false,
        kelurahan: [],
        kelurahan_loaded: false,
        form_lokasi_pelapor: null,
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
    componentDidMount() {
        GetProvinsi((data) => {
            this.setState({provinsi: data, provinsi_loaded: true})
        })
    }

    onCheckChange = (e) => {
        this.setState({
            unitUmur: e.target.checked
                ? 'bln'
                : 'thn'
        });
        console.log(`checked = ${e.target.checked}`)
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSelectChange = (name, value) => {
        if (name === "form_keluhan") {
            const keluhan = value.join();
            this.setState({[name]: keluhan});
            console.log(keluhan.split(','))
        } else {
            if (name === "form_provinsi") {
                this.setState({kabupaten_loaded: false, form_kabupaten: null});
                GetKabKot(value, (data) => this.setState({kabupaten: data, kabupaten_loaded: true}))
            } else if (name === "form_kabupaten") {
                this.setState({kecamatan_loaded: false, form_kecamatan: null});
                GetKecamatan(value, (data) => this.setState({kecamatan: data, kecamatan_loaded: true}))
            } else if (name === "form_kecamatan") {
                this.setState({kelurahan_loaded: false, form_kelurahan: null});
                GetKelurahan(value, (data) => this.setState({kelurahan: data, kelurahan_loaded: true}))
            }
            this.setState({[name]: value})
        }
    }
    sendData = () => {
        const {nik_registered, page_active} = this.state
        if (page_active > 0) {  
            const {
                form_nik,
                form_rt,
                form_rw,
                form_kelurahan,
                form_kecamatan,
                form_kabupaten,
                form_provinsi,
                form_keluhan,
                form_umur,
                form_nama_warga_sakit
            } = this.state
            rootRef
                .child('terlapor')
                .push({
                    nik_pelapor: form_nik,
                    nama: form_nama_warga_sakit,
                    rt: form_rt,
                    rw: form_rw,
                    kelurahan: form_kelurahan,
                    kecamatan: form_kecamatan,
                    kabupaten: form_kabupaten,
                    provinsi: form_provinsi,
                    keluhan: form_keluhan,
                    umur: form_umur
                }, (error)=>{
                    if(error){

                    } else {
                        message.success('Laporan terkirim.')
                        this.setState({redirect:true})
                    }
                })
                
        } else {
            if (nik_registered) {
                console.log('nothig to save');

            } else {
                var r = window.confirm("izinkan aplikasi mendapatkan lokasi akurat, bla!");
                if (r === true) {

                    get_gps_location((pos) => {
                        this.setState({
                            form_lokasi_pelapor: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        })
                        const {
                            form_nik,
                            form_nama_pelapor,
                            form_alamat,
                            form_rt,
                            form_rw,
                            form_kelurahan,
                            form_kecamatan,
                            form_kabupaten,
                            form_provinsi,
                            form_telp
                        } = this.state
                        rootRef
                            .child('pelapor')
                            .child(form_nik)
                            .set({
                                nik: form_nik,
                                nama: form_nama_pelapor,
                                alamat: form_alamat,
                                rt: form_rt,
                                rw: form_rw,
                                kelurahan: form_kelurahan,
                                kecamatan: form_kecamatan,
                                kabupaten: form_kabupaten,
                                provinsi: form_provinsi,
                                no_telp: form_telp,
                                kordinat_lokasi: {
                                    lat: pos.coords.latitude,
                                    lng: pos.coords.longitude
                                }
                            })
                        alert("lat : " + pos.coords.latitude + " lng : " + pos.coords.longitude)
                    })
                } else {
                    alert("aborted")
                }
            }
            this.nextPage()
        }

    }
    nextPage = () => {
        this.setState((state) => ({
            page_active: state.page_active + 1
        }))
    }
    prevPage = () => {
        this.setState((state) => ({
            page_active: state.page_active - 1
        }))
    }
    cekNIK = (name, value) => {
        console.log(value)
        if (value !== "") {
            this.setState({nik_checking: true})
            rootRef
                .child('pelapor')
                .child(value)
                .once('value', (snap) => {
                    console.log(snap.exists());
                    if (snap.exists()) {
                        message.success('NIK sudah terdaftar, tekan next untuk melanjutkan.')
                        console.log(snap.val());
                        GetKabKot(snap.val().provinsi, (data) => this.setState({kabupaten: data, kabupaten_loaded: true}))
                        GetKecamatan(snap.val().kabupaten, (data) => this.setState({kecamatan: data, kecamatan_loaded: true}))
                        GetKelurahan(snap.val().kecamatan, (data) => this.setState({kelurahan: data, kelurahan_loaded: true}))
                        this.setState({
                            [name]: value,
                            data_loaded: true,
                            nik_checking: false,
                            nik_registered:true,
                            form_nama_pelapor: snap
                                .val()
                                .nama,
                            form_alamat: snap
                                .val()
                                .alamat,
                            form_rt: snap
                                .val()
                                .rt,
                            form_rw: snap
                                .val()
                                .rw,
                            form_kelurahan: snap
                                .val()
                                .kelurahan,
                            form_kecamatan: snap
                                .val()
                                .kecamatan,
                            form_kabupaten: snap
                                .val()
                                .kabupaten,
                            form_provinsi: snap
                                .val()
                                .provinsi,
                            form_telp: snap
                                .val()
                                .no_telp
                        })
                        console.log(snap.val().kordinat_lokasi.lat);

                    } else {
                        message.warning('NIK blm terdaftar, dimohon untuk melengkapi data terlebih dahulu.')
                        this.setState({
                            [name]: value,
                            data_loaded: true,
                            nik_checking: false,
                            nik_registered:false,
                            form_nama_pelapor: '',
                            form_alamat: '',
                            form_rt: '',
                            form_rw: '',
                            form_kelurahan: null,
                            form_kecamatan: null,
                            form_kabupaten: null,
                            form_provinsi: null,
                            form_telp: ''
                        })
                    }

                })
        } else {
            message.warning('Mohon masukan NIK.')
        }

    }
    render() {
        const {
            redirect,
            unitUmur,
            nik_checking,
            page_active,
            provinsi,
            provinsi_loaded,
            kabupaten,
            kabupaten_loaded,
            kecamatan,
            kecamatan_loaded,
            kelurahan,
            kelurahan_loaded,
            form_nik,
            form_nama_pelapor,
            form_alamat,
            form_rt,
            form_rw,
            form_telp,
            form_umur,
            form_provinsi,
            form_kabupaten,
            form_kecamatan,
            form_kelurahan,
            form_keluhan,
            form_nama_warga_sakit,
            data_loaded
        } = this.state;
        if ( redirect ) {
			return <Redirect push to='/'/>
		}
        const rt = ['001', '002', '003', '004'];
        const rw = ['01', '02', '03', '04'];
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
        const PageSession = [(
                <div>
                    <Card title="Data pelapor">
                        <Form.Item label="NIK">
                            <Input.Search
                                type="number"
                                onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                                size="large"
                                placeholder="NIK"
                                onSearch={(value) => this.cekNIK("form_nik", value)}
                                enterButton="Cek NIK"
                                loading={nik_checking}/>
                        </Form.Item>

                    </Card>
                    <Divider dashed/>
                    <Collapse
                        activeKey={data_loaded
                        ? ['1']
                        : []}>
                        <Collapse.Panel header="Data rinci pelapor" key="1">
                            <Form.Item label="Nama pelapor">
                                <Input
                                    size="large"
                                    name="form_nama_pelapor"
                                    onChange={this.onChange}
                                    {...(form_nama_pelapor!=='' ? {value: form_nama_pelapor} : {})}/>
                            </Form.Item>

                            <Form.Item label="Alamat">
                                <Input.TextArea
                                    size="large"
                                    name="form_alamat"
                                    onChange={this.onChange}
                                    {...(form_alamat!=='' ? {value: form_alamat} : {})}/>
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item >
                                        <Select
                                            size="large"
                                            placeholder="RT"
                                            {...(form_rt!=='' ? {value: form_rt} : {})}
                                            onChange={(value) => this.onSelectChange("form_rt", value)}>
                                            <Select.OptGroup label="RT">{rt.map((data) => {
                                                    return <Select.Option key={data} value={data}>{data}</Select.Option>
                                                })}</Select.OptGroup>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item >
                                        <Select
                                            size="large"
                                            placeholder="RW"
                                            {...(form_rw!=='' ? {value: form_rw} : {})}
                                            onChange={(value) => this.onSelectChange("form_rw", value)}>
                                            <Select.OptGroup label="RW">{rw.map((data) => {
                                                    return <Select.Option key={data} value={data}>{data}</Select.Option>
                                                })}</Select.OptGroup>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item >
                                <Select
                                    size="large"
                                    {...(form_provinsi!==null ? {value: form_provinsi} : {})}
                                    placeholder="Provinsi"
                                    onChange={(value) => this.onSelectChange("form_provinsi", value)}
                                    loading={!provinsi_loaded}>
                                    <Select.OptGroup label="Provinsi">{provinsi.map((data) => {
                                            return <Select.Option key={data.id + data.nama} value={data.id}>{data.name}</Select.Option>
                                        })}</Select.OptGroup>
                                </Select>
                            </Form.Item>
                            <Form.Item >
                                <Select
                                    size="large"
                                    {...(form_kabupaten!==null ? {value: form_kabupaten} : {})}
                                    placeholder="Kabupaten"
                                    onChange={(value) => this.onSelectChange("form_kabupaten", value)}
                                    loading={!kabupaten_loaded}>
                                    <Select.OptGroup label="Kabupaten">{kabupaten.map((data) => {
                                            return <Select.Option key={data.id + data.name} value={data.id}>{data.name}</Select.Option>
                                        })}</Select.OptGroup>
                                </Select>
                            </Form.Item>
                            <Form.Item >
                                <Select
                                    size="large"
                                    {...(form_kecamatan!==null ? {value: form_kecamatan} : {})}
                                    placeholder="Kecamatan"
                                    onChange={(value) => this.onSelectChange("form_kecamatan", value)}
                                    loading={!kecamatan_loaded}>
                                    <Select.OptGroup label="Kecamatan">{kecamatan.map((data) => {
                                            return <Select.Option key={data.id + data.name} value={data.id}>{data.name}</Select.Option>
                                        })}</Select.OptGroup>
                                </Select>
                            </Form.Item>
                            <Form.Item >
                                <Select
                                    size="large"
                                    {...(form_kelurahan!==null ? {value: form_kelurahan} : {})}
                                    placeholder="Kelurahan"
                                    onChange={(value) => this.onSelectChange("form_kelurahan", value)}
                                    loading={!kelurahan_loaded}>
                                    <Select.OptGroup label="Kelurahan">{kelurahan.map((data) => {
                                            return <Select.Option key={data.id + data.name} value={data.id}>{data.name}</Select.Option>
                                        })}</Select.OptGroup>
                                </Select>
                            </Form.Item>
                            <Form.Item label="No. Telpon">
                                <Input
                                    size="large"
                                    name="form_telp"
                                    onChange={this.onChange}
                                    {...(form_telp!=='' ? {value: form_telp} : {})}/>
                            </Form.Item>
                        </Collapse.Panel>
                    </Collapse>
                </div>
            ), (
                <div>
                    <Card title="Data warga sakit">
                        <Form.Item label="Nama warga sakit">
                            <Input size="large" name="form_nama_warga_sakit" onChange={this.onChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Umur"
                            extra="beri centang jika warga sakit berumur dibawah satu tahun.">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <InputNumber
                                        size="large"
                                        value={form_umur}
                                        min={1}
                                        defaultValue={1}
                                        max={unitUmur === "bln"
                                        ? 11
                                        : 120}
                                        onChange={(value) => this.onSelectChange("form_umur", value)}
                                        onKeyDown={(e) => e.key === 'e' && e.preventDefault()}/>
                                    <b>*{unitUmur}</b>
                                </Col>
                                <Col span={16}>
                                    <Checkbox onChange={this.onCheckChange}>umur dibawah 1 thn</Checkbox>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item
                            label="Keluhan"
                            extra="input keluhan sesuai pilihan, tambah keluhan lain dan pisah dengan tanda koma `,` .">
                            <Select
                                size="large"
                                mode="tags"
                                style={{
                                width: '100%'
                            }}
                                placeholder="keluhan"
                                onChange={(value) => this.onSelectChange("form_keluhan", value)}
                                tokenSeparators={[',']}>{gejala.map((data) => {
                                    return <Select.Option key={data}>{data}</Select.Option>
                                })}</Select>
                        </Form.Item>
                    </Card>
                </div>
            )]
        return (
            <div>
                <PageHeader
                    onBack={() => window.history.back()}
                    title="Lapor"
                    subTitle="form lapor warga"/>
                <div style={ContainerLapor}>
                    <img alt="example" style={StyleLogo} src={Logo}/>
                    <div
                        style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Form layout="vertical">

                            {PageSession[page_active]
}
                            <Divider dashed/>
                            <Form.Item >
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <Button
                                            block
                                            type="dashed"
                                            size="large"
                                            onClick={() => page_active > 0
                                            ? this.prevPage()
                                            : window.history.back()}>{(page_active > 0
                                                ? "Kembali"
                                                : "Batal")}</Button>
                                    </Col>
                                    <Col span={18}>
                                        <Button
                                            block
                                            type="primary"
                                            size="large"
                                            onClick={this.sendData}
                                            disabled={page_active > 0?form_nama_warga_sakit===''||form_umur===null||form_keluhan==='':form_nik === '' || form_nama_pelapor === '' || form_telp === '' || form_alamat === '' || form_rt === '' || form_rw === '' || form_kelurahan === null || form_kecamatan === null || form_kabupaten === null || form_provinsi === null}>{(page_active > 0
                                                ? "Kirim"
                                                : "Selanjutnya")}</Button>
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