import { Dispatch } from 'react';
import type { CheckboxGroupProp } from 'app/components';

export enum ResponsesTypeEnum {
	SHORT_TEXT = 'SHORT_TEXT',
	LONG_TEXT = 'LONG_TEXT',
	SINGLE_CHOICE = 'SINGLE_CHOICE',
	EMAIL = 'EMAIL',
}

export type NextCallback = (T: string) => string;

export interface Question {
	key: string;
	responseType: ResponsesTypeEnum;
	question: string;
	choices?: CheckboxGroupProp['fields'];
	next?: string | NextCallback;
	placeholder?: string;
}

export type State = {
	questionFlow: Record<string, string>;
	questionFlowSequence: string[];
	inView: string;
};

export type Action =
	| {
			type: 'append';
			key: string;
			payload: Record<string, string>;
	  }
	| {
			type: 'update';
			payload: Record<string, string>;
	  };

export type ReducerDispatch = Dispatch<Action>;
