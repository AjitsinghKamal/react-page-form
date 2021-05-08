//#region imports
import { jest } from '@jest/globals';

import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import Questionaire from './questionaire';
import { FORM_QUESTIONS } from './constants';
//#endregion

test('Page renders form', () => {
	Element.prototype.scrollIntoView = jest.fn();
	const { getByPlaceholderText } = render(
		<Questionaire formQuestions={[FORM_QUESTIONS[0]]} />
	);
	const expected = FORM_QUESTIONS[0].placeholder || '';
	expect(getByPlaceholderText(expected)).toBeInTheDocument();
});

test('Page request api on submit', async () => {
	// TODO: fix mocking with esm
	// Element.prototype.scrollIntoView = jest.fn();
	// const { getByRole, getByPlaceholderText } = render(
	// 	<Questionaire formQuestions={[FORM_QUESTIONS[0]]} />
	// );
	// const expectedField = FORM_QUESTIONS[0].placeholder || 'test';
	// fireEvent.change(getByPlaceholderText(expectedField), {
	// 	target: { value: 't' },
	// });
	// fireEvent.click(getByRole('button'));
	// await waitFor(() => screen.getAllByTestId('rec-item'));
	// const rendered = screen
	// 	.getAllByTestId('rec-item')
	// 	.map((item) => item.textContent);
	// const items = [expect.stringContaining('test')];
	// expect(rendered).toEqual(expect.arrayContaining(items));
});
