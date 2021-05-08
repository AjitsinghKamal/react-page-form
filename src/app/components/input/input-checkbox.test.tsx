//#region imports
import { jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Checkbox from './input-checkbox';
//#endregion

test('Checkbox component should change checked state onClick', () => {
	const testLabel = 'test';
	const { getByLabelText } = render(
		<Checkbox name="test-checkbox" label={testLabel} />
	);
	const CheckboxEl = getByLabelText(testLabel);
	fireEvent.click(CheckboxEl);
	expect(CheckboxEl).toHaveProperty('checked', true);
});
test('Checkbox component should trigger onchange callback', () => {
	const callback = jest.fn();
	const testLabel = 'test';
	const { getByLabelText } = render(
		<Checkbox name="test-checkbox" onChange={callback} label={testLabel} />
	);
	fireEvent.click(getByLabelText(testLabel));
	expect(callback).toHaveBeenCalledTimes(1);
});
