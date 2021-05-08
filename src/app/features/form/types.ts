import { Dispatch } from 'react';
import type { CheckboxGroupProp } from 'app/components';

export enum ResponsesTypeEnum {
	SHORT_TEXT = 'SHORT_TEXT',
	LONG_TEXT = 'LONG_TEXT',
	SINGLE_CHOICE = 'SINGLE_CHOICE',
	MULTI_CHOICE = 'MULTI_CHOICE',
	EMAIL = 'EMAIL',
	NUM = 'NUM',
}

export type NextCallback = <K>(T: K) => string;

export interface Question {
	key: string;
	responseType: ResponsesTypeEnum;
	question: string;
	choices?: CheckboxGroupProp['fields'];
	next?: string | NextCallback;
	placeholder?: string;
}

export type State = {
	questionFlow: Record<string, string | number>;
	questionFlowSequence: string[];
	inView: {
		index: number;
		key: string;
	};
	showDialog: boolean;
};

export type Action =
	| {
			type: 'append' | 'reflow';
			payload: string;
	  }
	| {
			type: 'update';
			key: string;
			value: string | number;
			canReflow?: boolean;
	  }
	| {
			type: 'nav';
			payload: 'next' | 'prev' | number;
	  }
	| {
			type: 'jump';
			payload: string;
	  }
	| {
			type: 'reset';
	  }
	| {
			type: 'confirm';
			payload: boolean;
	  };

export type ReducerDispatch = Dispatch<Action>;
