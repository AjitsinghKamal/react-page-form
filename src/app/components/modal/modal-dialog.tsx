//#region imports
import { ReactNode, PropsWithChildren } from 'react';
import cx from 'classnames';
import css from './modal-dialog.module.scss';
import Button from '../button/button';
import { ReactComponent as Close } from 'src/assets/svgs/cross.svg';

//#endregion

export type Props = {
	/**
	 * Button title for cancel
	 */
	cancelText?: string;
	/**
	 * Button title for confirm
	 */
	okText?: string;
	/**
	 * renders header for dialog
	 */
	title?: ReactNode;
	onOk?: () => void;
	onClose?: () => void;
};

function Dialog({
	cancelText = 'Cancel',
	okText = 'Confirm',
	onOk,
	children,
	title,
	onClose,
}: PropsWithChildren<Props>) {
	return (
		<div className={css.dialog}>
			<header className={cx('px-24 flex', css.dialog_header)}>
				<div className={css.dialog_header_title}>{title}</div>
				<Button variant="ghost">
					<Close
						height="14"
						width="14"
						className={css.dialog_icon___close}
					/>
				</Button>
			</header>
			<div className={cx('px-24', css.dialog_content)}>{children}</div>
			<footer className={cx('px-24 py-16 flex', css.dialog_footer)}>
				<Button
					secondary
					onClick={onClose}
					variant="outline"
					className="mx-12"
				>
					{cancelText}
				</Button>
				<Button onClick={onOk}>{okText}</Button>
			</footer>
		</div>
	);
}

export default Dialog;
