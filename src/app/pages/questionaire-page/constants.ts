import { Question, ResponsesTypeEnum } from 'app/features/form/types';

export const FORM_QUESTIONS: Question[] = [
	{
		key: 'firstName',
		placeholder: 'i.e Jane Doe',
		responseType: ResponsesTypeEnum.SHORT_TEXT,
		question: `What's your First Name?`,
	},
	{
		key: 'address',
		placeholder: 'full address',
		responseType: ResponsesTypeEnum.LONG_TEXT,
		question: `What's your Address?`,
	},
	{
		key: 'occupation',
		responseType: ResponsesTypeEnum.SINGLE_CHOICE,
		question: `What's your Occupation?`,
		choices: [
			{
				label: 'Employed',
				key: 'EMPLOYED',
			},
			{ label: 'Student', key: 'STUDENT' },
			{ label: 'Self-Employed', key: 'SELF_EMPLOYED' },
		],
	},
	{
		key: 'children',
		responseType: ResponsesTypeEnum.SINGLE_CHOICE,
		question: `Do you have any children?`,
		choices: ['No', 'Yes'],
		next: (response) => (response ? 'numberOfChildren' : 'email'),
	},
	{
		key: 'numberOfChildren',
		responseType: ResponsesTypeEnum.NUM,
		question: `How many children do you have?`,
	},
	{
		key: 'email',
		responseType: ResponsesTypeEnum.EMAIL,
		question: `What's your email?`,
		placeholder: `i.e jane.doe@provider.com`,
	},
];
