import { rootRegionalRef, regionArr } from "../firebaseRef/firebaseRef";
export const GetProvinsi = ( callback ) => rootRegionalRef
	.child( 'provinsi' )
	.once('value', ( snap ) => {
		let arr = [ ];
		snap.forEach(( data ) => {
			arr.push(data.val( ))
		});
		callback( arr )
	});
export const GetKabKot = ( provinsi, callback ) => regionArr( 'kabupaten_kota', 'id_provinsi', provinsi ).once('value', ( snap ) => {
	let arr = [ ];
	snap.forEach(( data ) => {
		arr.push(data.val( ))
	});
	callback( arr )
});
export const GetKecamatan = ( kab_kot, callback ) => regionArr( 'kecamatan', 'id_kabupaten_kota', kab_kot ).once('value', ( snap ) => {
	let arr = [ ];
	snap.forEach(( data ) => {
		arr.push(data.val( ))
	});
	callback( arr )
});
export const GetKelurahan = ( kecamatan, callback ) => regionArr( 'desa_kelurahan', 'id_kecamatan', kecamatan ).once('value', ( snap ) => {
	let arr = [ ];
	snap.forEach(( data ) => {
		arr.push(data.val( ))
	});
	callback( arr )
});