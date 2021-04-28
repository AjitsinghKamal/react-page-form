import React from 'react';
import { Meta } from '@storybook/react';
import Button from './button';

export const Primary = () => (
	<Button primary onClick={() => console.log('action')}>
		Button
	</Button>
);

export default {
	title: 'Components/Button',
	component: Button,
} as Meta;
