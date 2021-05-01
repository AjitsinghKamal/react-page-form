//#region imports
import { ReactNode, FormEvent, useState, useEffect } from 'react';
import cx from 'classnames';
import css from './input.module.scss';
//#endregion

export type Props = {
	name: string;
	placeholder: string;
	value?: string;
	defaultValue?: string;
	label?: ReactNode;
	error?: ReactNode | boolean;
	onChange?: ({ name, value }: { name: string; value: string }) => void;
};

function Input({
	placeholder,
	name,
	label,
	value,
	error,
	defaultValue,
	onChange,
	...restHtmlAttributes
}: Props) {
	const [state, setState] = useState('');

	const _onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
		const { value: updatedValue } = e.currentTarget;
		onChange && onChange({ name, value: updatedValue });
		!value && setState(updatedValue);
	};

	useEffect(() => {
		defaultValue && setState(defaultValue);
	}, []);
	return (
		<div className={css.input}>
			{label && (
				<label className={css.input_label} htmlFor={name}>
					{label}
				</label>
			)}
			<input
				className={cx(css.input_field, {
					[css.input_field___error]: error,
				})}
				value={value || state}
				name={name}
				placeholder={placeholder}
				onChange={_onChangeHandler}
				{...restHtmlAttributes}
			/>
			{error && <small className={css.input_error}>{error}</small>}
		</div>
	);
}

export default Input;
