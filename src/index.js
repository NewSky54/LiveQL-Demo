import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import Demo from './containers/Demo.js'


ReactDOM.render(
	<MuiThemeProvider>
		<BrowserRouter>
				<Demo />
		</BrowserRouter>
	</MuiThemeProvider>
	, document.getElementById('root')
)