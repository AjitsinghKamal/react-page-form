// #region imports
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { DefaultLayout } from 'app/layouts';
//#endregion

/**
 * Bootstrap component
 * sets up top-level
 * app routing,
 * context providers,
 * error-boundaries,
 */
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={DefaultLayout} />
			</Switch>
		</Router>
	);
}

export default App;
