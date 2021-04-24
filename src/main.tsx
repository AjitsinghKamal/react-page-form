//#region imports
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './styles/main.scss';
//#endregion

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);
