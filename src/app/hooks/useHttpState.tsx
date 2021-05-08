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

/**
 * A specialized hook for managing fetch responses in component state
 *
 * @returns
 * {
 *  response
 *  status
 *  error
 * }
 *
 * [response] Response from a successful fetch request.
 *
 * [status] Identifier for tracking the current state of fetch request
 * can be
 * - 'WAITING', for request in progress. Useful for showing loading indicators.
 * - 'DONE', for request successful and response recieved.
 * - 'ERROR', request failed.
 * - null, request not initialised yet.
 *
 * [error] Returns an object with {statusCode, response}
 *
 * @returns dispatch - state modifier
 *
 */
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
