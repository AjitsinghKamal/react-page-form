//#region imports
import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { QuestionairePage, AboutPage } from 'app/pages';
//#endregion

function DefaultLayout() {
	return (
		<Suspense fallback={<div></div>}>
			<div>
				<Switch>
					<Route
						path={QuestionairePage.path}
						component={QuestionairePage.component}
					/>
					<Route
						path={AboutPage.path}
						component={AboutPage.component}
					/>
				</Switch>
			</div>
		</Suspense>
	);
}

export default DefaultLayout;
