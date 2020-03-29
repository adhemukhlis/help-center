export const get_gps_location = ( func ) => {
	if ( navigator.geolocation ) {
		navigator
			.geolocation
			.getCurrentPosition(func, ( ) => console.log( 'error' ), { timeout: 3000 })
	} else {
		alert( "Geolocation is not supported by this browser." )
	}
}