import { lazy } from 'react';

export const QuestionairePage = {
	component: lazy(() => import('app/pages/questionaire-page/questionaire')),
	path: '/',
};
export const AboutPage = {
	component: lazy(() => import('app/pages/about-page/about')),
	path: '/about',
};
