import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store//storeConfig.js';
import App from './containers/App.jsx';
import DevTools from './containers/Devtools.jsx';



ReactDom.render(
	<Provider store={store}>
		<div style={{maxWidth:'50%', flex: 1, display: 'flex', flexDirection: 'column'}}>
			<App />
			<DevTools />
		</div>
    </Provider>,
    document.getElementById('app')
)