import React from 'react';
import { Story } from '@storybook/react';

import Input, { Props as InputProps } from './input';

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Text = Template.bind({});

Text.args = {
	placeholder: 'Enter something here...',
	error: false,
	label: 'Label',
	name: 'Default Input',
};

export default {
	title: 'Components/Input',
	component: Text,
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
	},
};
