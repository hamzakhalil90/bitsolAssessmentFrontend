import { AllowedMethodsType } from '@/types/custom.types';
import FrontendHandler from '../handlers/frontend.handler';
import { LOCAL_API } from '@/constants';

type RequestParams = {
    url: string;
    method: AllowedMethodsType;
    body?: any;
};

export const AssessmentAPI = <T,>(body: RequestParams) => {
    return FrontendHandler(false).post<T>(LOCAL_API.ASSESSMENT_URL, {
        ...body,
    });
};
