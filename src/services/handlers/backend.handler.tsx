import { AuthTokens } from '@/types/auth.types';
import CustomAxios from './axios.handler';

const BackendHandler = ({
    tokens,
    base_url,
    isMultiPart = false,
}: {
    tokens?: AuthTokens;
    base_url: string;
    isMultiPart?: boolean;
}) => CustomAxios({ tokens, base_url, isMultiPart });

export default BackendHandler;
