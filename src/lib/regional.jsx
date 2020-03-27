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
export const GetKabKot = ( provinsi, callback ) => regionArr( 'kab-kot', 'province_id', provinsi ).once('value', ( snap ) => {
	let arr = [ ];
	snap.forEach(( data ) => {
		arr.push(data.val( ))
	});
	callback( arr )
});
export const GetKecamatan = ( kab_kot, callback ) => regionArr( 'kecamatan', 'regency_id', kab_kot ).once('value', ( snap ) => {
	let arr = [ ];
	snap.forEach(( data ) => {
		arr.push(data.val( ))
	});
	callback( arr )
});
export const GetKelurahan = ( kecamatan, callback ) => regionArr( 'kelurahan', 'district_id', kecamatan ).once('value', ( snap ) => {
	let arr = [ ];
	snap.forEach(( data ) => {
		arr.push(data.val( ))
	});
	callback( arr )
});