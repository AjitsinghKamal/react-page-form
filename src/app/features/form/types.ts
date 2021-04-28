export type ResponsesType = 'SHORT_TEXT' | 'LONG_TEXT' | 'CHOICE' | 'EMAIL';
export type NextCallback = (T: string) => string;

export interface Question {
	id: string;
	responseType: ResponsesType;
	question: string;
	response: string;
	next: NextCallback;
}
