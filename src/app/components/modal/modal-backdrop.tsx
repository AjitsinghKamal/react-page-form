//#region imports
import { PropsWithChildren } from 'react';
import cx from 'classnames';
import css from './modal-backdrop.module.scss';
//#endregion

export type Props = {
	transparent?: boolean;
	onClose?: () => void;
};

function Backdrop({
	onClose,
	children,
	transparent,
}: PropsWithChildren<Props>) {
	return (
		<div
			className={cx(css.backdrop, {
				[css.backdrop___none]: transparent,
			})}
			onClick={onClose}
		>
			{children}
		</div>
	);
}

export default Backdrop;
