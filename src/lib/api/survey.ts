import { privateApi, publicApi } from "./client";
import type { ApiResponse } from "@/types/api-response";

export const surveyKeys = {
	list: (params: any) => ["cms", "surveys", "registrations", params] as const,
};

export const surveyApi = {
	createDraft: async (body: {
		studentNumber?: string;
		fullName: string;
		genderCode?: string;
		phoneNumber?: string;
		departmentName?: string;
		campusCode?: string;
		locale: "ko" | "en";
		surveyId: number;
	}): Promise<ApiResponse<number>> => {
		const response = await publicApi.post<ApiResponse<number>>(
			"/cms/surveys/registrations/draft",
			body
		);
		return response.data;
	},

	submit: async (body: {
		registrationId: number;
		responses: { questionCode: string; answerValue?: string; answerScore?: number; itemOrder?: number }[];
	}): Promise<ApiResponse<number>> => {
		const response = await publicApi.post<ApiResponse<number>>(
			"/cms/surveys/submit",
			body
		);
		return response.data;
	},

	listRegistrations: async (params: { locale: string; status?: string; page?: number; size?: number }): Promise<ApiResponse<any>> => {
		const response = await privateApi.get<ApiResponse<any>>(
			"/cms/surveys/registrations",
			{ params }
		);
		return response.data;
	},

	// 공개 저장: 사용자 기본 정보만 저장(백엔드에 공개 엔드포인트가 있어야 함)
	savePersonPublic: async (body: {
		studentNumber?: string;
		fullName: string;
		genderCode?: string;
		departmentName?: string;
		locale?: string;
	}): Promise<ApiResponse<number>> => {
		const response = await publicApi.post<ApiResponse<number>>(
			"/public/surveys/persons",
			body
		);
		return response.data;
	},
};
