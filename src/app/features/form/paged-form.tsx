//#region imports
import {
	useMemo,
	useRef,
	useEffect,
	useCallback,
	useReducer,
	CSSProperties,
} from 'react';
import cx from 'classnames';

import { Question, State, Action } from './types';
import PagedFormQuestion from './paged-form-question';
import { Button, Modal } from 'app/components';

import css from './paged-form.module.scss';
// import { ReactComponent as Arrow } from 'src/assets/svgs/arrow.svg';

//#endregion

type QuestionList = Question[];
type IterableQuestionMap = Map<string, Question>;

type Props = {
	/**
	 * list of questions in the form
	 */
	questions: QuestionList;
	/**
	 * updates the end `Submit` button to show a loader
	 */
	isSubmitting?: boolean;
	/**
	 * Adds a sticky title heading to form
	 */
	title?: string;
	/**
	 * Adjusts content width
	 * accepts either percentage or px value
	 */
	contentWidth?: string;
	/**
	 * callback for end form submit
	 */
	onFormSubmit: (T: State['questionFlow']) => void;
};

function isKey(next: Question['next']): next is string {
	return typeof next === 'string';
}

const initialState: State = {
	questionFlow: {}, // maintain a hash-map for quick lookup of question
	questionFlowSequence: [], // keep track of question order since flow can be dynamic
	inView: {
		index: -1,
		key: '',
	}, // active question index
	showDialog: false,
};

function FormReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'append': {
			const updateSeq = [...state.questionFlowSequence, action.key];
			return {
				...state,
				questionFlow: { ...state.questionFlow, ...action.payload },
				questionFlowSequence: updateSeq,
				inView: {
					index: updateSeq.length - 1,
					key: action.key,
				},
			};
		}
		case 'update':
			return {
				...state,
				questionFlow: { ...state.questionFlow, ...action.payload },
			};
		case 'jump': {
			const jumpPosition = state.questionFlowSequence.findIndex(
				(key: string) => action.payload === key
			);
			if (jumpPosition) {
				return {
					...state,
					inView: {
						index: jumpPosition,
						key: action.payload,
					},
				};
			} else {
				return state;
			}
		}
		case 'nav':
			return {
				...state,
				inView: {
					index: action.payload,
					key: state.questionFlowSequence[action.payload],
				},
			};
		case 'reset':
			return { ...initialState };
		case 'confirm':
			return { ...state, showDialog: action.payload };
		default:
			return state;
	}
}

function PagedForm({
	questions,
	isSubmitting,
	onFormSubmit,
	title,
	contentWidth = '50%',
}: Props) {
	const [state, dispatch] = useReducer(FormReducer, initialState);
	const quesRef = useRef<HTMLDivElement>(null);
	/**
	 * prepare a map to easily look-up questions in supplied list
	 * adds `next` to each unique value if absent
	 */
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

	const enablePreviousNav = useMemo(() => state.inView.index > 0, [
		state.inView.index,
	]);
	const enableNextNav = useMemo(
		() => state.inView.index < state.questionFlowSequence.length - 1,
		[state.inView.index, state.questionFlowSequence]
	);
	/**
	 * set up next form question as per the `next` key
	 *
	 * when supplied `next` key is callback, it will be executed
	 * By default if `next` wasnt specified for question
	 * then the next element in question list is used.
	 * @param currentQues
	 */
	const presentNext = (currentQues: Question) => {
		const data = isKey(currentQues.next)
			? iterableQuestions.get(currentQues.next)
			: iterableQuestions.get(
					currentQues.next
						? currentQues.next(state.questionFlow[state.inView.key])
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
	};

	/**
	 * capture responses for any
	 * submitted question in store
	 * and prepare next question
	 */
	const shouldSubmitResponse = () => {
		if (!state.inView.key) return;
		const current = iterableQuestions.get(state.inView.key);
		if (!current) return;
		current.next ? presentNext(current) : onFormSubmit(state.questionFlow);
	};

	// const onNavButtonClick = (navTo: number) => {
	// 	dispatch({
	// 		type: 'nav',
	// 		payload: state.inView.index + navTo,
	// 	});
	// };

	// const onDownClick = useCallback(() => onNavButtonClick(1), []);
	// const onUpClick = useCallback(() => onNavButtonClick(-1), []);
	const onResetClick = useCallback(() => {
		dispatch({
			type: 'confirm',
			payload: true,
		});
	}, []);

	const discardResetClick = useCallback(() => {
		dispatch({
			type: 'confirm',
			payload: false,
		});
	}, []);

	const confirmResetClick = useCallback(() => {
		dispatch({
			type: 'reset',
		});
	}, []);

	useEffect(() => {
		// boot-up our state with the
		// first question in provided list
		if (state.inView.index < 0) {
			dispatch({
				type: 'append',
				key: questions[0].key,
				payload: {
					[questions[0].key]: '',
				},
			});
		}
	}, [state.inView.index]);

	return (
		<div
			className={cx(css.paged_container)}
			style={
				contentWidth
					? ({ '--form-content': contentWidth } as CSSProperties)
					: undefined
			}
		>
			<header className={cx('px-12 py-16', css.paged_header)}>
				<h1 className="ft-18">{title}</h1>
			</header>

			<div className={cx(css.paged)} ref={quesRef}>
				{state.questionFlowSequence.map((data) => (
					<PagedFormQuestion
						key={`form_${data}`}
						isInView={data === state.inView.key}
						response={state.questionFlow[data]}
						questionData={iterableQuestions.get(data)}
						dispatch={dispatch}
						onSubmit={shouldSubmitResponse}
						isSubmitting={isSubmitting}
					/>
				))}
			</div>
			<Modal
				isVisible={state.showDialog}
				title="Confirm form reset"
				okText="Yes, Discard"
				cancelText="Cancel"
				closeOnBackdropClick
				onOk={confirmResetClick}
				onClose={discardResetClick}
			>
				<p className="py-18">
					Are you sure you want to discard your changes?
				</p>
			</Modal>
			<footer className={cx('py-16 px-12', css.paged_footer)}>
				<Button
					variant="ghost"
					secondary
					className="ml-auto"
					onClick={onResetClick}
				>
					Reset
				</Button>
			</footer>
		</div>
	);
}

export default PagedForm;
