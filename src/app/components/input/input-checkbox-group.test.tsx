/**
 * @jest-environment jsdom
 */

//#region imports
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CheckboxGroup from './input-checkbox-group';
//#endregion

test('CheckboxGroup component should have only one selected when configured for singleClick', () => {
	const fields = ['chkbx 1', 'chkbx 2'];
	const { getByLabelText } = render(
		<CheckboxGroup name="test-checkbox" fields={fields} singleSelect />
	);
	const CheckboxElOne = getByLabelText(fields[0]);
	const CheckboxElTwo = getByLabelText(fields[1]);
	fireEvent.click(CheckboxElOne);
	fireEvent.click(CheckboxElTwo);
	expect(CheckboxElTwo).toHaveProperty('checked', true);
	expect(CheckboxElOne).toHaveProperty('checked', false);
});

test('CheckboxGroup component should support multiselect', () => {
	const fields = ['chkbx 1', 'chkbx 2'];
	const { getByLabelText } = render(
		<CheckboxGroup name="test-checkbox" fields={fields} />
	);
	const CheckboxElOne = getByLabelText(fields[0]);
	const CheckboxElTwo = getByLabelText(fields[1]);
	fireEvent.click(CheckboxElOne);
	fireEvent.click(CheckboxElTwo);
	expect(CheckboxElTwo).toHaveProperty('checked', true);
	expect(CheckboxElOne).toHaveProperty('checked', true);
});
