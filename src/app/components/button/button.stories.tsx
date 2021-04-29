import React from 'react';
import Button from './button';

const Template = (args: any) => (
	<Button onClick={() => console.log('action')} {...args}>
		Button
	</Button>
);
export const Default = Template.bind({});

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		variant: {
			control: {
				type: 'radio',
				options: ['ghost', 'solid', 'outline'],
			},
		},
	},
	args: {
		primary: true,
		secondary: false,
		variant: 'solid',
	},
};
