import React from 'react';
import HeaderDefault from './header-default';

const Template = (args: any) => <HeaderDefault {...args} />;
export const Default = Template.bind({});

export default {
	title: 'Components/Header',
	component: HeaderDefault,
};
