//#region imports
import cx from 'classnames';
import {
	PropsWithChildren,
	CSSProperties,
	ButtonHTMLAttributes,
	MouseEvent,
} from 'react';

import css from './button.module.scss';
import { ReactComponent as Loader } from 'src/assets/svgs/pulse.svg';
//#endregion

type RestrictedColor =
	| {
			primary: true;
			secondary?: false;
			color?: never;
	  }
	| {
			secondary: true;
			primary?: false;
			color?: never;
	  }
	| {
			secondary?: false;
			primary?: false;
			color?: string;
	  };

type Props = {
	/**
	 * Callback on button click
	 */
	onClick?: (E: MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Button supports multiple variants
	 * Default variant set is solid
	 */
	variant?: 'outline' | 'ghost' | 'solid';
	/**
	 * setup loading indicator for button
	 * when loading also disables the button
	 */
	loading?: boolean;
	/**
	 * disables button interaction
	 */
	disabled?: boolean;
	size?: 'small' | 'large';
} & RestrictedColor;

function Button({
	children,
	onClick,
	color,
	primary,
	secondary,
	loading,
	disabled,
	size,
	variant = 'solid',
	className,
	...restHtmlAttributes
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) {
	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		(!loading || !disabled) && onClick && onClick(e);
	};
	return (
		<button
			style={
				color ? ({ '--btn-color': color } as CSSProperties) : undefined
			}
			className={cx(
				css.button,
				css[`button___${variant}`],
				{
					[css.button___primary]:
						primary || (!primary && !secondary && !color),
					[css.button___secondary]: secondary,
					[css[`button___${size}`]]: size,
					[css.button___disabled]: disabled,
					[css.button___loading]: loading,
				},
				className
			)}
			aria-disabled={disabled}
			onClick={onClickHandler}
			{...restHtmlAttributes}
		>
			{children}
			{loading && <Loader />}
		</button>
	);
}

export default Button;
