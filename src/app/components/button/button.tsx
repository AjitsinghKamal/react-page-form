//#region imports
import cx from 'classnames';
import { PropsWithChildren, CSSProperties } from 'react';
import css from './button.module.scss';
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
	onClick: <T, K>(P: T) => K | void;
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
} & RestrictedColor;

function Button({
	children,
	onClick,
	color,
	variant = 'solid',
	primary,
	secondary,
	...restHtmlAttributes
}: PropsWithChildren<Props>) {
	return (
		<button
			style={
				color ? ({ '--btn-color': color } as CSSProperties) : undefined
			}
			className={cx(css.button, css[`button___${variant}`], {
				[css.button___primary]:
					primary || (!primary && !secondary && !color),
				[css.button___secondary]: secondary,
			})}
			onClick={onClick}
			{...restHtmlAttributes}
		>
			{children}
		</button>
	);
}

export default Button;
