//#region imports
import { PropsWithChildren } from 'react';

import Backdrop from './modal-backdrop';
import Dialog, { Props as DialogProps } from './modal-dialog';
import { Portal } from 'app/components';

//#endregion

export type Props = {
	/**
	 * show or hide the modal
	 */
	isVisible: boolean;
	/**
	 * if provide, will append the modal as child of this Element
	 * By default modal is appended in document root
	 */
	container?: string;
	/**
	 * Modal can render dialog or drawer
	 *
	 * TODO: add support for drawer
	 */
	type?: 'Dialog';
	/**
	 * whether modal should be closed on click on backdrop
	 */
	closeOnBackdropClick?: boolean;
	/**
	 * hide translucent backdrop
	 */
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
