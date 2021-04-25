//#region imports
import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import cx from 'clsx';

import { QuestionairePage, AboutPage } from 'app/pages';
import { HeaderDefault } from 'app/components';
import css from './default.module.scss';
//#endregion

function DefaultLayout() {
	return (
		<div className={css.layout}>
			<HeaderDefault />
			<Suspense fallback={<div></div>}>
				<div className={cx('container', css.layout_content)}>
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
		</div>
	);
}

export default DefaultLayout;
