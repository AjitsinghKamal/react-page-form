//#region imports
import { jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from './input';
//#endregion

test('Input component should trigger callback onChange', () => {
	const callback = jest.fn();
	const { getByPlaceholderText } = render(
		<Input name="test-checkbox" placeholder="test" onChange={callback} />
	);
	fireEvent.change(getByPlaceholderText('test'), { target: { value: 't' } });
	expect(callback).toHaveBeenCalledTimes(1);
});

test('Input component should be updated', () => {
	const { getByPlaceholderText } = render(
		<Input name="test-checkbox" placeholder="test" />
	);
	const field = getByPlaceholderText('test');
	fireEvent.change(field, { target: { value: 't' } });
	expect(field).toHaveProperty('value', 't');
});
