//#region imports
import {
	ReactNode,
	FormEvent,
	useState,
	useEffect,
	HTMLAttributes,
	PropsWithChildren,
} from 'react';
import cx from 'classnames';
import css from './input.module.scss';
import Button from './../button/button';
import Backdrop from './modal-backdrop';
import Dialog, { Props as DialogProps } from './modal-dialog';
import { Portal } from 'app/components';
import { ReactComponent as Close } from 'src/assets/svgs/pulse.svg';

//#endregion

export type Props = {
	isVisible: boolean;
	container?: string;
	type?: 'Dialog';
	closeOnBackdropClick?: boolean;
	noBackdrop?: boolean;
} & DialogProps;

function Modal({
	container,
	closeOnBackdropClick,
	onClose,
	isVisible,
	type = 'Dialog',
	noBackdrop,
	...rest
}: PropsWithChildren<Props>) {
	return (
		<Portal containerId={container}>
			{isVisible && (
				<Backdrop
					onClose={closeOnBackdropClick ? onClose : undefined}
					transparent={noBackdrop}
				>
					{type === 'Dialog' ? (
						<Dialog {...rest} onClose={onClose} />
					) : null}
				</Backdrop>
			)}
		</Portal>
	);
}

export default Modal;
