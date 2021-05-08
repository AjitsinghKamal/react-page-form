import { PropsWithChildren, useMemo } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	/**
	 * append portal to the Element with this id
	 */
	containerId?: string;
};
function Portal({ containerId, children }: PropsWithChildren<Props>) {
	const container = useMemo(() => {
		const _container = containerId && document.querySelector(containerId);
		return _container || document.body;
	}, []);

	return createPortal(children, container);
}

export default Portal;
