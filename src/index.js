import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/es/form/style/css';
import 'antd/es/checkbox/style/css';
import 'antd/es/page-header/style/css';
import 'antd/es/divider/style/css';
import 'antd/es/card/style/css';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/input/style/css';
import 'antd/es/button/style/css';
import 'antd/es/select/style/css';
import 'antd/es/input-number/style/css';
import Router from './route/route'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
	onUpdate: registration => {
		alert( 'New version available!  Ready to update?' );
		window
			.location
			.reload( );
		if ( registration && registration.waiting ) {
			registration
				.waiting
				.postMessage({ type: 'SKIP_WAITING' });
			registration
				.waiting
				.addEventListener('statechange', e => {
					if ( e.target.state === 'activated' ) {
						window
							.location
							.reload( )
					}
				})
		}
	}
});
