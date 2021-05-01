import { Seo } from 'app/components';
import { PagedForm } from 'app/features';
import { FORM_QUESTIONS } from './constants';
import css from './questionaire.module.scss';

function Questionaire() {
	return (
		<>
			<Seo />
			<main className={css.questionaire}>
				<PagedForm questions={FORM_QUESTIONS} />
			</main>
		</>
	);
}

export default Questionaire;
