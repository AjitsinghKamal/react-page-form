//#region imports
import { useEffect, useState, HTMLAttributes, FormEvent } from 'react';
import cx from 'classnames';
import css from './input-checkbox.module.scss';

import { ReactComponent as Icon } from 'src/assets/svgs/tick.svg';
//#endregion

export type OnChangeResponse = {
	name: string | number;
	value: boolean;
};
export type Props = {
	name: string | number;
	label?: string;
	checked?: boolean;
	defaultValue?: boolean;
	prefixLabel?: boolean;
	onChange?: (T: OnChangeResponse) => void;
};

function InputCheckbox({
	name,
	checked,
	defaultValue,
	prefixLabel,
	onChange,
	className,
	label = '',
	...restHtmlAttributes
}: Props & Pick<HTMLAttributes<HTMLLabelElement>, 'className'>) {
	const [state, setState] = useState(false);

	const _onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
		const { checked: isSelected } = e.currentTarget;
		onChange &&
			onChange({
				value: isSelected,
				name,
			});
		checked == undefined && setState(isSelected);
	};

	useEffect(() => {
		setState(!!defaultValue);
	}, []);

	return (
		<label className={cx(css.checkbox, className)}>
			{prefixLabel && label}
			<input
				className={css.checkbox_input}
				type="checkbox"
				checked={checked || state}
				onChange={_onChangeHandler}
				{...restHtmlAttributes}
			/>
			<span
				role="checkbox"
				aria-checked={checked || state}
				aria-labelledby={'' + name}
				className={cx(css.checkbox_field, {
					[css.checkbox_field___checked]: checked || state,
				})}
			>
				<Icon className={css.checkbox_field_icon} />
			</span>
			{!prefixLabel && label}
		</label>
	);
}

export default InputCheckbox;
