//#region imports
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import Recommendations from './recommendations';
//#endregion

test('Recommendations shows loading placeholder', () => {
	const { getByTestId } = render(<Recommendations loading list={[]} />);
	expect(getByTestId('rec-loader')).toBeInTheDocument();
});

test('Recommendations shows results', () => {
	const testList = [
		{ type: '1', price: { amount: 0, periodicity: 'month' } },
		{ type: '2', price: { amount: 0, periodicity: 'year' } },
	];
	const { getAllByTestId } = render(<Recommendations list={testList} />);
	const rendered = getAllByTestId('rec-item').map((item) => item.textContent);
	const items = testList.map((item) =>
		expect.stringContaining(item.price.periodicity)
	);

	expect(rendered).toEqual(expect.arrayContaining(items));
});
