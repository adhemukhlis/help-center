import {rootRegionalRef, regionArr} from "../firebaseRef/firebaseRef";
export const GetProvinsi = (callback) => rootRegionalRef
    .child('provinsi')
    .once('value', (snap) => {
        let arr = [];
        snap.forEach((data) => {
            arr.push(data.val())
        });
        callback(arr)
    });
export const GetKabKot = (provinsi, callback) => regionArr('kabupaten_kota', 'id_provinsi', provinsi).once('value', (snap) => {
    let arr = [];
    snap.forEach((data) => {
        arr.push(data.val())
    });
    callback(arr)
});
export const GetKecamatan = (kab_kot, callback) => regionArr('kecamatan', 'id_kabupaten_kota', kab_kot).once('value', (snap) => {
    let arr = [];
    snap.forEach((data) => {
        arr.push(data.val())
    });
    callback(arr)
});
export const GetKelurahan = (kecamatan, callback) => regionArr('desa_kelurahan', 'id_kecamatan', kecamatan).once('value', (snap) => {
    let arr = [];
    snap.forEach((data) => {
        arr.push(data.val())
    });
    callback(arr)
});
export const getProvinsiName = (id_provinsi, callback) => rootRegionalRef
    .child('provinsi')
    .child(id_provinsi)
    .once("value").then( data => {
        callback( data.val().name)
    });
export const getKabupatenKotaName = (id_kab_kot, callback) => rootRegionalRef
    .child('kabupaten_kota')
    .child(id_kab_kot)
    .once("value").then( data => {
        callback( data.val().name)
    });
export const getKecamatanName = (id_kecamatan, callback) => rootRegionalRef
    .child('kecamatan')
    .child(id_kecamatan)
    .once("value").then( data => {
        callback( data.val().name)
    });

export const getKelurahanName = (id_kelurahan, callback) => rootRegionalRef
    .child('desa_kelurahan')
    .child(id_kelurahan)
    .once("value").then( data => {
        callback( data.val().name)
    });