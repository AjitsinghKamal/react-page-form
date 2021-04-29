//#region imports
import { useEffect, useState } from 'react';
import cx from 'classnames';
import css from './input-checkbox-group.module.scss';

import Checkbox, { OnChangeResponse } from './input-checkbox';
//#endregion

type CheckboxField = {
	key: string;
	label: string;
	value?: boolean;
};

type GroupState = Record<string, boolean>;

export type Props = {
	name: string;
	fields: (string | CheckboxField)[];
	singleSelect?: boolean;
	direction?: 'row' | 'column';
	checked?: boolean[] | CheckboxField[];
	prefixLabel?: boolean;
	onChange?: <K>(T: K) => void;
};

function isCheckboxField(
	field: CheckboxField | string
): field is CheckboxField {
	return field.hasOwnProperty('key');
}

function InputCheckboxGroup({
	name,
	fields,
	prefixLabel,
	onChange,
	singleSelect,
	direction = 'column',
}: Props) {
	const [state, setState] = useState<GroupState>({});

	const initiateState = () => {
		const initialState: GroupState = fields.reduce<GroupState>(
			(acc, field: string | CheckboxField, index) => {
				if (isCheckboxField(field)) {
					acc[field.key] = !!field.value;
				} else {
					acc[index] = false;
				}
				return acc;
			},
			{}
		);
		setState(initialState);
	};

	const handleStateUpdateForSingleSelect = ({
		name,
		value,
	}: OnChangeResponse) => {
		const nextState = { ...state };
		return Object.fromEntries(
			Object.entries(nextState).map(([key]) => {
				const newValue = name == key ? value : false;
				return [key, newValue];
			})
		);
	};

	const handleStateUpdateForMultiSelect = ({
		name,
		value,
	}: OnChangeResponse) => {
		const nextState = { ...state };
		nextState[name] = value;
		return nextState;
	};

	const _onChangeHandler = (res: OnChangeResponse) => {
		const nextState = singleSelect
			? handleStateUpdateForSingleSelect(res)
			: handleStateUpdateForMultiSelect(res);
		onChange &&
			onChange({
				state: nextState,
				change: res,
			});
		setState(nextState);
	};

	useEffect(() => {
		if (!fields.length) return;
		initiateState();
	}, []);

	return (
		<div
			className={cx(
				css.checkboxGroup,
				css[`checkboxGroup___${direction}`]
			)}
		>
			{fields &&
				fields.map((field, index) => {
					const fieldLabel = isCheckboxField(field)
						? field.label
						: field;
					const fieldName = isCheckboxField(field)
						? field.key
						: index;
					return (
						<Checkbox
							label={fieldLabel}
							prefixLabel={prefixLabel}
							key={fieldName}
							name={index}
							checked={state[fieldName]}
							onChange={_onChangeHandler}
							className={css.checkboxGroup_field}
						/>
					);
				})}
		</div>
	);
}

export default InputCheckboxGroup;
