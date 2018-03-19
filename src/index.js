import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App.js'


ReactDOM.render(
	<MuiThemeProvider>
		<BrowserRouter>
				<App />
		</BrowserRouter>
	</MuiThemeProvider>
	, document.getElementById('root')
)