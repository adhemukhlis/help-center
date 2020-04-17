import React, {Component} from 'react'
import {Table} from 'antd';
class TablePantau extends Component {
    state = {
        res: []
    }
    render() {
        const {data} = this.props
        const columns = [
            {
                title: 'Nama',
                width: 100,
                dataIndex: 'nama',
                key: 'nama',
                fixed: 'left'
            }, {
                title: 'Umur',
                width: 100,
                dataIndex: 'umur',
                key: 'umur'
            }, {
                title: 'Keluhan',
                dataIndex: 'keluhan',
                key: 'keluhan',
                width: 150
            }, {
                title: 'Provinsi',
                dataIndex: 'prov',
                key: 'prov',
                width: 150
            }, {
                title: 'Kabupaten',
                dataIndex: 'kab',
                key: 'kab',
                width: 150
            }, {
                title: 'Kecamatan',
                dataIndex: 'kec',
                key: 'kec',
                width: 150
            }, {
                title: 'Desa',
                dataIndex: 'des',
                key: 'des',
                width: 150
            }, {
                title: 'RW',
                dataIndex: 'rw',
                key: 'rw',
                width: 150
            }, {
                title: 'RT',
                dataIndex: 'rt',
                key: 'rt',
                width: 150
            }, {
                title: 'Pelapor',
                dataIndex: 'pelapor',
                key: 'pelapor',
                width: 150
            }
        ];

        return (<Table
            columns={columns}
            dataSource={data}
            scroll={{
            x: 1500,
            y: 400
        }}/>)
    }
}
export default TablePantau