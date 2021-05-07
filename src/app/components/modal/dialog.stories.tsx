import { Story } from '@storybook/react';
import ModalDialog, { Props } from './modal-dialog';

const Template: Story<Props> = (args) => (
	<ModalDialog {...args}>I am a dialog</ModalDialog>
);
export const Dialog = Template.bind({});

export default {
	title: 'Components/Modal',
	component: Dialog,
	argTypes: {},
	args: {
		title: 'Title',
		okText: 'OK',
		cancelText: 'Nope',
	},
};
