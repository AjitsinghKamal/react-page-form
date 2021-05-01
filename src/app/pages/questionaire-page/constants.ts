import { Question, ResponsesTypeEnum } from 'app/features/form/types';

export const FORM_QUESTIONS: Question[] = [
	{
		key: 'name',
		placeholder: 'i.e Jane Doe',
		responseType: ResponsesTypeEnum.SHORT_TEXT,
		question: `What's your First Name?`,
	},
	{
		key: 'addrs',
		placeholder: 'full address',
		responseType: ResponsesTypeEnum.LONG_TEXT,
		question: `What's your Address?`,
	},
	{
		key: 'occupation',
		responseType: ResponsesTypeEnum.SINGLE_CHOICE,
		question: `What's your Occupation?`,
		choices: ['Employed', 'Student', 'Self-Employed'],
	},
	{
		key: 'children',
		responseType: ResponsesTypeEnum.SINGLE_CHOICE,
		question: `Do you have any children?`,
		choices: ['Yes', 'No'],
		next: (response) => (response ? 'children_count' : ''),
	},
	{
		key: 'children_count',
		responseType: ResponsesTypeEnum.SINGLE_CHOICE,
		question: `Do you have any children?`,
		choices: ['Yes', 'No'],
	},
	{
		key: 'email',
		responseType: ResponsesTypeEnum.EMAIL,
		question: `What's your email?`,
		placeholder: `i.e jane.doe@provider.com`,
	},
];
