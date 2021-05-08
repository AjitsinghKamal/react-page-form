import { useReducer, useMemo } from 'react';

type HttpRequestState = {
	response: any;
	status: RequestState;
	error: any;
};

type Action =
	| {
			type: 'status';
			payload: RequestState;
	  }
	| {
			type: 'update';
			payload: {
				response?: any;
				status?: RequestState;
				error?: any;
			};
	  }
	| {
			type: 'error';
			payload: RequestError;
	  }
	| {
			type: 'response';
			payload: any;
	  }
	| {
			type: 'fetch' | 'reset';
	  };

const initialState = {
	response: null,
	status: null,
	error: null,
};
function Reducer(state: HttpRequestState, action: Action): HttpRequestState {
	switch (action.type) {
		case 'status':
		case 'response':
		case 'error':
			return { ...state, [action.type]: action.payload };
		case 'update': {
			const _state = { ...state, ...action.payload };
			if (action.payload.response) _state.status = 'DONE';
			if (action.payload.error) _state.status = 'ERROR';
			return _state;
		}
		case 'fetch':
			return { ...state, status: 'WAITING' };
		case 'reset':
			return { ...initialState };
		default:
			return state;
	}
}
const useHttpState = () => {
	const [responseState, dispatch] = useReducer(Reducer, initialState);

	return useMemo(
		() => ({
			dispatch,
			responseState,
		}),
		[responseState.status]
	);
};

export default useHttpState;
