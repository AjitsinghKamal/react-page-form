//#region imports
import { useMemo, useEffect, useRef, useReducer } from 'react';
import cx from 'classnames';

import { Question } from './types';
import PagedFormQuestion from './paged-form-question';

import css from './paged-form.module.scss';
//#endregion

type QuestionList = Question[];
type IterableQuestionMap = Map<string, Question>;
type Props = {
	questions: QuestionList;
};
type State = {
	questionFlow: Record<string, string>;
	questionFlowSequence: string[];
	inView: string;
};

type Action =
	| {
			type: 'append';
			key: string;
			payload: Record<string, string>;
	  }
	| {
			type: 'update';
			payload: Record<string, string>;
	  };

function isKey(next: Question['next']): next is string {
	return typeof next === 'string';
}

const initialState: State = {
	questionFlow: {},
	questionFlowSequence: [],
	inView: '',
};
function FormReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'append':
			return {
				...state,
				questionFlow: { ...state.questionFlow, ...action.payload },
				questionFlowSequence: [
					...state.questionFlowSequence,
					action.key,
				],
			};
		case 'update':
			return {
				...state,
				questionFlow: { ...state.questionFlow, ...action.payload },
			};
		default:
			return state;
	}
}
function PagedForm({ questions }: Props) {
	const [state, dispatch] = useReducer(FormReducer, initialState);

	const iterableQuestions: IterableQuestionMap = useMemo(
		() =>
			new Map(
				questions.map((question, index) => {
					return [
						question.key,
						{
							...question,
							next: question.next || questions[index + 1]?.key,
						},
					];
				})
			),
		[]
	);

	const onResponse = () => {};

	const presentNext = () => {
		if (!state.inView || !iterableQuestions.get(state.inView)?.next) {
			return null;
		}
		const currentQues = iterableQuestions.get(state.inView);
		if (currentQues) {
			const data = isKey(currentQues.next)
				? iterableQuestions.get(currentQues.next)
				: iterableQuestions.get(
						currentQues.next
							? currentQues.next(state.questionFlow[state.inView])
							: ''
				  );
			data &&
				dispatch({
					type: 'append',
					key: data.key,
					payload: {
						[data.key]: '',
					},
				});
		}
	};

	useEffect(() => {
		dispatch({
			type: 'append',
			key: questions[0].key,
			payload: {
				[questions[0].key]: '',
			},
		});
	}, []);

	return (
		<div className={cx(css.paged)}>
			{state.questionFlowSequence.map((data) => (
				<PagedFormQuestion
					questionData={iterableQuestions.get(data)}
					onChange={onResponse}
				/>
			))}
		</div>
	);
}

export default PagedForm;
