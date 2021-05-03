/**
 * @jest-environment jsdom
 */

//#region imports
import {
	render,
	fireEvent,
	waitFor,
	getByLabelText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import PagedFormQuestion from './paged-form-question';
import { ResponsesTypeEnum } from './types';
//#endregion

test('Form is rendered with input', async () => {
	const callback = jest.fn();
	const questionsToTest = {
		key: 'first',
		question: `What's your First Name?`,
		placeholder: 'first',
		responseType: ResponsesTypeEnum.SHORT_TEXT,
	};

	const { getByPlaceholderText } = render(
		<PagedFormQuestion
			questionData={questionsToTest}
			dispatch={callback}
			onSubmit={callback}
		/>
	);
	expect(getByPlaceholderText('first')).toBeInTheDocument();
});

test('Form is rendered with checkbox', async () => {
	const callback = jest.fn();
	const questionsToTest = {
		key: 'first',
		question: `What's your First Name?`,
		choices: ['choice'],
		responseType: ResponsesTypeEnum.SINGLE_CHOICE,
	};

	const { getByRole } = render(
		<PagedFormQuestion
			questionData={questionsToTest}
			dispatch={callback}
			onSubmit={callback}
		/>
	);
	expect(getByRole('checkbox', { name: 'choice' })).toBeInTheDocument();
});

test('Form is disabled without input', async () => {
	const callback = jest.fn();
	const dispatch = jest.fn();

	const questionsToTest = {
		key: 'first',
		question: `What's your First Name?`,
		placeholder: 'first',
		responseType: ResponsesTypeEnum.SHORT_TEXT,
	};

	const { getByRole } = render(
		<PagedFormQuestion
			questionData={questionsToTest}
			dispatch={dispatch}
			onSubmit={callback}
		/>
	);
	fireEvent.click(getByRole('button'));
	expect(callback).not.toHaveBeenCalled();
});

test('Form is enabled with valid response', async () => {
	const dispatch = jest.fn();
	const callback = jest.fn();
	const questionsToTest = {
		key: 'first',
		question: `What's your First Name?`,
		placeholder: 'first',
		responseType: ResponsesTypeEnum.SHORT_TEXT,
	};

	const { getByRole } = render(
		<PagedFormQuestion
			questionData={questionsToTest}
			dispatch={dispatch}
			onSubmit={callback}
			response="t"
		/>
	);
	fireEvent.click(getByRole('button'));
	expect(callback).toHaveBeenCalledTimes(1);
});

test(`Form button text is 'Submit' for last form`, async () => {
	const callback = jest.fn();
	const questionsToTest = {
		key: 'first',
		question: `What's your First Name?`,
		placeholder: 'first',
		responseType: ResponsesTypeEnum.SHORT_TEXT,
	};

	const { getByRole } = render(
		<PagedFormQuestion
			questionData={questionsToTest}
			dispatch={callback}
			onSubmit={callback}
		/>
	);
	expect(getByRole('button')).toHaveTextContent('Submit');
});

test(`Form button text is 'Next'`, async () => {
	const callback = jest.fn();
	const questionsToTest = {
		key: 'first',
		question: `What's your First Name?`,
		placeholder: 'first',
		next: '1',
		responseType: ResponsesTypeEnum.SHORT_TEXT,
	};

	const { getByRole } = render(
		<PagedFormQuestion
			questionData={questionsToTest}
			dispatch={callback}
			onSubmit={callback}
		/>
	);
	expect(getByRole('button')).toHaveTextContent('Next');
});
