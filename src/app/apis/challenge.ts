//#region imports
import Http from './http';
//#endregion

const ApiBase = import.meta.env.VITE_API_CHALLENGE;

export type PostChallengeRequest = {
	numberOfChildren: number;
	firstName: string;
	address: string;
	occupation: string;
	email: string;
};

export type PostChallengeResponse = {
	jwt: string;
};

export type RecommendationsResponse = {
	type: string;
	price: {
		amount: number;
		periodicity: string;
	};
};

export function PostChallenge(
	payload: PostChallengeRequest
): Promise<PostChallengeResponse> {
	return Http(`${ApiBase}/user`, { method: 'POST', body: payload });
}

export function GetRecommendation(
	token: string
): Promise<RecommendationsResponse[]> {
	return Http(`${ApiBase}/recommendation`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}
