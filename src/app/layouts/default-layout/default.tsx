//#region imports
import { Suspense, HTMLAttributes } from 'react';
import { Switch, Route } from 'react-router-dom';
import cx from 'classnames';

import { QuestionairePage, AboutPage } from 'app/pages';
import { HeaderDefault } from 'app/components';
import css from './default.module.scss';
import { ReactComponent as Loader } from 'src/assets/svgs/pulse.svg';

//#endregion

type Props = {};

function DefaultLayout({ className }: Props & HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cx(css.layout, className)}>
			<HeaderDefault />
			<Suspense fallback={<Loader className="loader___centered" />}>
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
