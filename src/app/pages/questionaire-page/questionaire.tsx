//#region imports
import cx from 'classnames';
import { Seo } from 'app/components';
import { PagedForm } from 'app/features';
import { FORM_QUESTIONS } from './constants';
import css from './questionaire.module.scss';
//#endregion

function Questionaire() {
	return (
		<>
			<Seo />
			<main className={cx(css.questionaire, 'clear')}>
				<PagedForm questions={FORM_QUESTIONS} />
			</main>
		</>
	);
}

export default Questionaire;
