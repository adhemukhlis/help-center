import firebase from '@firebase/app';
import '@firebase/database';
const regionalConfig = {
	apiKey: "AIzaSyDx9xXilqhDblbFFoWL96pvd_dOe3EZ4M4",
	authDomain: "indonesia-region.firebaseapp.com",
	databaseURL: "https://indonesia-region.firebaseio.com",
	storageBucket: "indonesia-region.appspot.com"
};
const config = {
	apiKey: "AIzaSyARr7LinVxpQG7lXdHc0FKJIL-EKxAB7hI",
	authDomain: "kscovid19.firebaseapp.com",
	databaseURL: "https://kscovid19.firebaseio.com",
	projectId: "kscovid19",
	storageBucket: "kscovid19.appspot.com",
	messagingSenderId: "225946065385",
	appId: "1:225946065385:web:fb0466d4e353bdacc4d378",
	measurementId: "G-B6VJC93FSX"
};
firebase.initializeApp( config );
var regionalFirebase = firebase.initializeApp( regionalConfig, "other" );
export const rootRegionalRef = regionalFirebase
	.database( )
	.ref( )
	.child( 'regional' );
export const regionArr = ( region, order, equal ) => rootRegionalRef
	.child( region )
	.orderByChild( order )
	.equalTo( equal );
export const rootRef = firebase
	.database( )
	.ref( );