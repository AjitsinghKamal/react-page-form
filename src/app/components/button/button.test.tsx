/**
 * @jest-environment jsdom
 */

//#region imports
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from './button';
//#endregion

test('Button component should trigger action on click', () => {
	const mockClickHandler = jest.fn();
	const { getByRole } = render(<Button onClick={mockClickHandler} />);
	fireEvent.click(getByRole('button'));
	expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
