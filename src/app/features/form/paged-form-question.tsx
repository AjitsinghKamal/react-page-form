//#region imports
import { FormEvent, useRef, useLayoutEffect, useMemo } from 'react';
import cx from 'classnames';

import { Question, ResponsesTypeEnum, ReducerDispatch } from './types';
import {
	Input,
	CheckboxGroup,
	Button,
	CheckboxGroupProp,
	InputProps,
} from 'app/components';

import { ReactComponent as EntrIcon } from 'src/assets/svgs/enter.svg';
import css from './paged-form-question.module.scss';
//#endregion

type Props = {
	dispatch: ReducerDispatch;
	questionData?: Question;
	onSubmit: () => void;
	response?: string | number;
	isInView?: boolean;
};

function isChoiceType(choice: ResponsesTypeEnum): boolean {
	return [
		ResponsesTypeEnum.SINGLE_CHOICE,
		ResponsesTypeEnum.MULTI_CHOICE,
	].includes(choice);
}

function PagedFormQuestion({
	questionData,
	dispatch,
	onSubmit,
	response,
	isInView,
}: Props) {
	const sectionRef = useRef<HTMLElement>(null);
	const shouldEnableForm = useMemo(
		() => response && !!String(response).trim(),
		[response]
	);

	const onChange: CheckboxGroupProp['onChange'] = ({ change, groupName }) => {
		dispatch({
			type: 'update',
			payload: {
				[groupName]: change.name,
			},
		});
	};
	const onTextInputChange: InputProps['onChange'] = ({ name, value }) => {
		dispatch({
			type: 'update',
			payload: {
				[name]: value,
			},
		});
	};
	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		shouldEnableForm && onSubmit();
	};

	useLayoutEffect(() => {
		isInView &&
			sectionRef.current &&
			sectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest',
			});
	}, [isInView]);

	return questionData ? (
		<section
			ref={sectionRef}
			className={cx(css.pagedForm, {
				[css.pagedForm__active]: isInView,
			})}
		>
			<form onSubmit={handleFormSubmit} className={css.pagedForm_form}>
				<h1
					className={cx('my-24', css.pagedForm_ques)}
					aria-label={questionData.question}
				>
					{questionData.question}
				</h1>
				{isChoiceType(questionData.responseType) ? (
					<CheckboxGroup
						name={questionData.key}
						fields={questionData.choices || []}
						onChange={onChange}
						singleSelect={
							questionData.responseType ===
							ResponsesTypeEnum.SINGLE_CHOICE
						}
					/>
				) : (
					<Input
						placeholder={questionData.placeholder || ''}
						name={questionData.key}
						onChange={onTextInputChange}
						type={
							questionData.responseType === ResponsesTypeEnum.NUM
								? 'number'
								: 'text'
						}
					/>
				)}
				<Button
					type="submit"
					size="large"
					className="my-24"
					disabled={!shouldEnableForm}
				>
					{questionData.next ? 'Next' : 'Submit'}
					<EntrIcon className={css.pagedForm_ques_btn_icon} />
				</Button>
			</form>
		</section>
	) : null;
}

export default PagedFormQuestion;
