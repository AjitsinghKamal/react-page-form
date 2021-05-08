//#region imports
import { jest } from '@jest/globals';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import PagedForm from './paged-form';
import { ResponsesTypeEnum } from './types';
//#endregion

test('Form shows next question in sequence', async () => {
	Element.prototype.scrollIntoView = jest.fn();
	const mockSubmit = jest.fn();
	const questionsToTest = [
		{
			key: 'first',
			question: `What's your First Name?`,
			placeholder: 'first',
			responseType: ResponsesTypeEnum.SHORT_TEXT,
		},
		{
			key: 'second',
			question: `What's your Second Name?`,
			placeholder: 'second',
			responseType: ResponsesTypeEnum.SHORT_TEXT,
		},
	];
	const { getByRole, getByText, getByPlaceholderText } = render(
		<PagedForm questions={questionsToTest} onFormSubmit={mockSubmit} />
	);
	fireEvent.change(getByPlaceholderText('first'), { target: { value: 't' } });
	fireEvent.click(getByRole('button', { name: 'Next' }));
	await waitFor(() => expect(getByText(/second/i)).toBeInTheDocument());
});
