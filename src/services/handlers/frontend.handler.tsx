import CustomAxios from './axios.handler';

const FrontendHandler = (isMultiPart: boolean = false) => CustomAxios({ type: 'next', isMultiPart });

export default FrontendHandler;
