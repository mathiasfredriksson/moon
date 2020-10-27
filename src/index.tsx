import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
	typography: {
		fontFamily: 'Recursive Sans Linear Static Medium'
	},
	palette: {
		type: 'dark',
		primary: {
			light: '#0bc9da',
			main: '#00b7c9',
			dark: '#02abba',
			contrastText: '#000'
		},
		secondary: {
			light: 'rgb(79, 126, 177)',
			main: 'rgb(146, 166, 188);',
			dark: 'rgb(59, 101, 145)',
			contrastText: '#FFF'
		},
		background: {
			paper: '#111',
			default: '#111'
		}
	}
});

ReactDOM.render(
  	<React.StrictMode>
	  	<MuiThemeProvider theme = { theme }>
			<CssBaseline />
    		<App />
		</MuiThemeProvider>
  	</React.StrictMode>,
  	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
