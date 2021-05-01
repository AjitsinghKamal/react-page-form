//#region imports
import cx from 'classnames';

import { Question, ResponsesTypeEnum } from './types';
import { Input, CheckboxGroup } from 'app/components';

import css from './paged-form-question.module.scss';
//#endregion

type Props = {
	questionData?: Question;
	onChange: <K>(T: K) => void;
};

function PagedFormQuestion({ questionData, onChange }: Props) {
	return questionData ? (
		<div className={cx('flex', css.pagedForm)}>
			<form>
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
						onChange={onChange}
					/>
				)}
			</form>
		</div>
	) : null;
}

export default PagedFormQuestion;
