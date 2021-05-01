//#region imports
import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import cx from 'classnames';

import { QuestionairePage, AboutPage } from 'app/pages';
import { HeaderDefault } from 'app/components';
import css from './default.module.scss';
//#endregion

function DefaultLayout() {
	return (
		<div className={css.layout}>
			<HeaderDefault />
			<Suspense fallback={<div></div>}>
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
			</Suspense>
		</div>
	);
}

export default DefaultLayout;
