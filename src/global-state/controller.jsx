import {rootRef} from '../firebaseRef/firebaseRef'
import {setState} from "react-rest-state";
import {getDataItem} from '../api-handler/api-handler'

const getWilayah = async(provinsi, kabupaten, kecamatan, kelurahan) => {
    const provinsi_tmp = await getDataItem('provinsi', provinsi)
    const kabupaten_tmp = await getDataItem('kabupaten_kota', kabupaten)
    const kecamatan_tmp = await getDataItem('kecamatan', kecamatan)
    const kelurahan_tmp = await getDataItem('desa_kelurahan', kelurahan)
    return {provinsi: provinsi_tmp, kabupaten: kabupaten_tmp, kecamatan: kecamatan_tmp, kelurahan: kelurahan_tmp}
}

const getData = async(snap) => {
    const tmp = await snap.map((lala, i) => {
        return getWilayah(lala.provinsi, lala.kabupaten, lala.kecamatan, lala.kelurahan).then((xx) => {
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

export const fetchTerlapor = () => rootRef
    .child('terlapor')
    .once('value', (snap) => {
        getData(Object.values(snap.val()).map(e => {
            return e
        })).then(x => setState({_globalTerlapor: x, _globalTerlaporLoaded: true}))
    })