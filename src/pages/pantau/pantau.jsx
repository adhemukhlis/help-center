import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {PieChartOutlined, DatabaseOutlined} from '@ant-design/icons';
import {getDataItem} from '../../api-handler/api-handler'
import {rootRef} from '../../firebaseRef/firebaseRef'
import {
    Form,
    Card,
    PageHeader,
    Input,
    Divider,
    Row,
    Col,
    Select,
    Tabs
} from 'antd';
import TablePantau from './table'
import {ContainerPantau, StyleLogo} from "../style";
import Logo from "../../chart-network.svg";
const data = {
    labels: [
        'Positif : 124', 'Sembuh : 124', 'Meninggal : 124', 'Pantauan :124'
    ],
    datasets: [
        {
            data: [
                124, 124, 124, 124
            ],
            backgroundColor: [
                '#99FF63', '#6DC0FF', '#FF6385', '#FFE563'
            ],
            hoverBackgroundColor: ['#7DFF38', '#45AEFF', '#FF3863', '#FFDE38']
        }
    ],
    options: {
        legend: {
            position: 'bottom'
        }
    }
};

class Pantau extends Component {
    state = {
        isLoaded: false,
        pencarian_daerah: '',
        filter_rt: '',
        filter_rw: '',
        filter_kecamatan: '',
        filter_kelurahan: '',
        res: []
    };
    getWilayah = async(provinsi, kabupaten, kecamatan, kelurahan) => {
        const provinsi_tmp = await getDataItem('provinsi', provinsi)
        const kabupaten_tmp = await getDataItem('kabupaten_kota', kabupaten)
        const kecamatan_tmp = await getDataItem('kecamatan', kecamatan)
        const kelurahan_tmp = await getDataItem('desa_kelurahan', kelurahan)
        return {provinsi: provinsi_tmp, kabupaten: kabupaten_tmp, kecamatan: kecamatan_tmp, kelurahan: kelurahan_tmp}
    }

    getData = async(snap) => {

        const tmp = await snap.map((lala, i) => {
            return this
                .getWilayah(lala.provinsi, lala.kabupaten, lala.kecamatan, lala.kelurahan)
                .then((xx) => {
                    return {
                        key: i,
                        nama: lala.nama,
                        umur: lala.umur,
                        keluhan: lala.keluhan,
                        prov: xx.provinsi,
                        kab: xx.kabupaten,
                        kec: xx.kecamatan,
                        des: xx.kelurahan,
                        rw: lala.rw,
                        rt: lala.rt,
                        pelapor: lala.nik_pelapor
                    }
                })

        })
        return Promise.all(tmp)
    }
    componentDidMount() {
        rootRef
            .child('terlapor')
            .on('value', (snap) => {
                // const a = Object.values(snap.val()).map(e => {return e});
                // console.log(a)
                // let arr = []
                // snap.forEach((data) => {
                //     arr.push(data.val())
                // })
                this
                    .getData(Object.values(snap.val()).map(e => {return e}))
                    .then(x => this.setState({res:x, isLoaded:true}))
            })
    }
    onChange = (name, value) => {
        this.setState({[name]: value})
    }
    render() {
        const {res, isLoaded} = this.state
        const rt = ['001', '002', '003', '004'];
        const rw = ['01', '02', '03', '04'];
        const kelurahan = [
            'Berkoh',
            'Karangklesem',
            'Karangpucung',
            'Purwokerto Kidul',
            'Purwokerto Kulon',
            'TanjungTeluk'
        ];
        const kecamatan = ['Purwokerto Selatan'];

        return (isLoaded && res != []
            ? <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title="Pantau"
                        subTitle="pantau data wilayah"/>
                    <div style={ContainerPantau}>
                        <img alt="example" style={StyleLogo} src={Logo}/>
                        <div
                            style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Form layout="vertical">
                                <Card>
                                    <Form.Item label="Cari">
                                        <Input.Search
                                            placeholder="cari daerah"
                                            onSearch={(value) => this.onChange("pencarian_daerah", value)}
                                            enterButton/>
                                    </Form.Item>
                                    <Form.Item label="Filter berdasarkan">
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item >
                                                    <Select
                                                        size="large"
                                                        placeholder="RT"
                                                        onChange={(value) => this.onChange("filter_rt", value)}>
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
                                                        onChange={(value) => this.onChange("filter_rw", value)}>
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
                                                placeholder="Kelurahan"
                                                onChange={(value) => this.onChange("filter_kelurahan", value)}>
                                                <Select.OptGroup label="Kelurahan">{kelurahan.map((data) => {
                                                        return <Select.Option key={data} value={data}>{data}</Select.Option>
                                                    })}</Select.OptGroup>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item >
                                            <Select
                                                size="large"
                                                placeholder="Kecamatan"
                                                onChange={(value) => this.onChange("filter_kecamatan", value)}>
                                                <Select.OptGroup label="Kecamatan">{kecamatan.map((data) => {
                                                        return <Select.Option key={data} value={data}>{data}</Select.Option>
                                                    })}</Select.OptGroup>
                                            </Select>
                                        </Form.Item>
                                    </Form.Item>
                                </Card>
                                <Divider dashed/>
                            </Form>
                            <Tabs
                                defaultActiveKey="2"
                                style={{
                                width: '100%',
                                height: '80vh'
                            }}
                                size='large'>
                                <Tabs.TabPane
                                    tab={(
                                    <span>
                                        <PieChartOutlined/>
                                        Grafik
                                    </span>
                                )}
                                    key="1">
                                    <div >
                                        <Doughnut
                                            data={data}
                                            options={{
                                            legend: {
                                                position: 'right'
                                            }
                                        }}/>
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane
                                    tab={(
                                    <span>
                                        <DatabaseOutlined/>
                                        Tabel
                                    </span>
                                )}
                                    key="2">
                                    <TablePantau data={res}/>

                                </Tabs.TabPane>
                            </Tabs>

                        </div>
                    </div>
                </div>
            : null)
    }
}
export default Pantau;