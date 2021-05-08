//#region imports
import { FormEvent, useRef, useMemo } from 'react';
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
	isSubmitting?: boolean;
	isReadonly?: boolean;
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
	isSubmitting,
	isReadonly,
	...rest
}: Props) {
	const sectionRef = useRef<HTMLElement>(null);
	const shouldEnableForm = useMemo(
		() =>
			response !== undefined && !!String(response).trim() && !isReadonly,
		[response]
	);

	const onChange: CheckboxGroupProp['onChange'] = ({ change, groupName }) => {
		dispatch({
			type: 'update',
			key: groupName,
			value: change.name,
			canReflow: typeof questionData?.next !== 'string',
		});
	};
	const onTextInputChange: InputProps['onChange'] = ({ name, value }) => {
		dispatch({
			type: 'update',
			key: name,
			value,
			canReflow: typeof questionData?.next !== 'string',
		});
	};
	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		shouldEnableForm && onSubmit();
	};

	return questionData ? (
		<section
			ref={sectionRef}
			className={cx(css.pagedForm, {
				[css.pagedForm__active]: isInView,
			})}
			{...rest}
		>
			<form
				onSubmit={handleFormSubmit}
				className={cx('px-12', css.pagedForm_form)}
			>
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
					loading={isSubmitting}
					icon={<EntrIcon />}
				>
					{questionData.next ? 'Next' : 'Submit'}
				</Button>
			</form>
		</section>
	) : null;
}

export default PagedFormQuestion;
