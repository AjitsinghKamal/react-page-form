import { lazy } from 'react';

export const QuestionairePage = {
	component: lazy(() => import('app/pages/questionaire')),
	path: '/',
};
export const AboutPage = {
	component: lazy(() => import('app/pages/about')),
	path: '/about',
};
