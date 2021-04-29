import React from 'react';
import { Story } from '@storybook/react';

import InputCheckboxGroup, { Props } from './input-checkbox-group';

const CheckboxTemplate: Story<Props> = (args) => (
	<InputCheckboxGroup {...args} />
);

export const CheckboxGroup = CheckboxTemplate.bind({});

CheckboxGroup.args = {
	fields: ['Label', 'Label 2'],
	prefixLabel: false,
	singleSelect: false,
};

export default {
	title: 'Components/Input',
	component: CheckboxGroup,
	argTypes: {
		onChange: {
			table: {
				disable: true,
			},
		},
		fields: {
			control: {
				type: 'array',
			},
		},
	},
};
