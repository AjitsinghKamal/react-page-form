import React from 'react';
import { Story } from '@storybook/react';

import InputCheckbox, { Props as CheckboxProps } from './input-checkbox';

const CheckboxTemplate: Story<CheckboxProps> = (args) => (
	<InputCheckbox {...args} />
);

export const Checkbox = CheckboxTemplate.bind({});

Checkbox.args = {
	label: 'Label',
	prefixLabel: false,
	checked: undefined,
};

export default {
	title: 'Components/Input',
	component: Checkbox,
	argTypes: {
		defaultValue: {
			table: {
				disable: true,
			},
		},
		onChange: {
			table: {
				disable: true,
			},
		},
		checked: {
			control: {
				type: 'boolean',
			},
		},
	},
};
