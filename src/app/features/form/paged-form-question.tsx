//#region imports
import cx from 'classnames';
import { FormEvent } from 'react';
import { Question, ResponsesTypeEnum, ReducerDispatch } from './types';
import {
	Input,
	CheckboxGroup,
	Button,
	CheckboxGroupProp,
	InputProps,
} from 'app/components';

import css from './paged-form-question.module.scss';
//#endregion

type Props = {
	dispatch: ReducerDispatch;
	questionData?: Question;
	onSubmit: () => void;
};

function PagedFormQuestion({ questionData, dispatch, onSubmit }: Props) {
	const onChange = () => {};
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
		onSubmit();
	};
	return questionData ? (
		<div className={cx('flex', css.pagedForm)}>
			<form onSubmit={handleFormSubmit}>
				<h1 className={cx('my-24', css.pagedForm_ques)}>
					{questionData.question}
				</h1>
				{questionData.responseType ===
				ResponsesTypeEnum.SINGLE_CHOICE ? (
					<CheckboxGroup
						name={questionData.key}
						fields={questionData.choices || []}
						onChange={onChange}
					/>
				) : (
					<Input
						placeholder={questionData.placeholder || ''}
						name={questionData.key}
						onChange={onTextInputChange}
					/>
				)}
				<Button type="submit">Submit</Button>
			</form>
		</div>
	) : null;
}

export default PagedFormQuestion;
