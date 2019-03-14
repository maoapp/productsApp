// @vendors
import React from 'react';
import ReactDOM from 'react-dom';

// @Components
import Routes from './routes/Routes';
import * as serviceWorker from './serviceWorker';

// @styles
import './index.css';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
	google: {
		families: ['Roboto:300,400,500,700', 'Material Icons'],
	},
});

ReactDOM.render(<Routes/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
