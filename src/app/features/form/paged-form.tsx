import { Question } from './types';

type Props = {
	questions: Question[];
};
function StepForm({ questions }: Props) {
	return (
		<div>
			<form>{questions.map(() => {})}</form>
		</div>
	);
}
