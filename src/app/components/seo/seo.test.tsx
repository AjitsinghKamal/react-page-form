/**
 * @jest-environment jsdom
 */

//#region imports
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Seo from './seo';
//#endregion

test('Seo component sets document meta', () => {
	const title = 'Test App Title';
	render(<Seo title={title} />);
	waitFor(() => expect(document.title).toEqual('title'));
});
