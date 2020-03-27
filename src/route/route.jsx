import React, { Component } from 'react';

// import { devmode } from "../config/config";
// import BaseLayout from "./base";
import {rootRegionalRef} from "../firebaseRef/firebaseRef";
// import { DisableReactDevTools } from "../lib/devtool-killer";
class Route extends Component {
	// componentDidMount( ) {
	// 	DisableReactDevTools( !devmode )
	// }

processEx = ( e ) => {
	const files = e.target.files;
		Object
			.keys( files )
			.forEach(i => {
				const file = files[i];
				console.log(files)
				const reader = new FileReader( );
				reader.onload = ( e ) => {
	
					let fileData = reader
					.result
								.split("\n");
						let errorset = []
						fileData.forEach(data=>{
							const row = data.split(",")
							// rootRegionalRef.child(row[0]).remove()
							rootRegionalRef.child("kelurahan").child(row[0]).set({
								id:row[0],
								"id_kecamatan":row[1],
								name:row[2]
							}, ( error ) => {
								if ( error ) {
									errorset.push({id:row[0], name:row[2]})
									console.log('%c '+row[0]+" - "+row[2]+" : FAIL", 'background: #E73943; color: #fff')
								} else {
									console.log('%c '+row[0]+" - "+row[2]+" : SUCCESS", 'background: #41BFE1; color: #fff')
								}
							})
							
							// console.log(row[1])
							// console.log(row[2])
						})
						console.log("FINISH")
						console.log(errorset)
				
				}
				reader.readAsBinaryString( file )
			});
}
render( ) { 	
		// return ( <BaseLayout/> )
		return ( <div>
			<input type="file" id="file" accept=".csv" onChange={this.processEx} multiple/>
		</div> )
	}
}
export default Route;
