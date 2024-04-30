import { UserSessionObject } from "./types/auth.types";


/* ----------------------------------- ENV ---------------------------------- */
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? '';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? '';
export const TEST_ENV = process.env.NEXT_PUBLIC_TEST_ENV ?? '';
export const REFRESH_TOKEN_ALIAS = process.env.NEXT_PUBLIC_REFRESH_TOKEN_ALIAS ?? '';
export const ACCESS_TOKEN_ALIAS = process.env.NEXT_PUBLIC_ACCESS_TOKEN_ALIAS ?? '';
export const DEBUG_RENDERS = false;
export const SESSION_OBJECT_NAME = process.env.NEXT_PUBLIC_SESSION_OBJECT_NAME ?? '';

/* ---------------------------------- THEME --------------------------------- */
export const DEFAULT_PRIMARY_COLOR = '#46C7FF';
export const DEFAULT_SECONDARY_COLOR = '#1890ff';
/* ------------------------------- LOCAL APIS ------------------------------- */
export const LOCAL_API = {
    // Auth
    LOGIN_URL: 'login/',
    LOGOUT_URL: 'logout/',
    REGISTER_URL: 'signup/',
   ASSESSMENT_URL: 'assessment/',
};

/* ------------------------------ BACKEND URLS ------------------------------ */
export const API = {
    // Auth
    LOGIN_URL: 'login/',
    REFRESH_URL: 'token/refresh/',
    LOGOUT_URL: 'logout/',
    // USER
    USERS_CRUD_URL: 'user/',

};

/* ------------------------------- MENU PATHS ------------------------------- */
export const MENU_PATH = {
    HOME: {
        pathname: '/users',
        key: '1',
        label: 'Users',
        public: true,
    },
   
};

/* ----------------------------- NON-MENU PATHS ----------------------------- */
export const NON_MENU_PATHS = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    HOME: '/',
    USER_EDIT:'users/edit'
};

/* ----------------------------- DEFAULT SESSION ---------------------------- */
export const DEFAULT_USER_OBJECT = {
    UserID: 0,
    Email: '',
    DateOfBirth: '',
    FirstName: '',
    LastName: '',
    CountryID: 0,
    PhoneNumber: '',
    IsSuperAdmin: false,
    IsApplicant: false,
    IsAdministrator: false,
    IsAgent: false,
    AccountActivationTimestamp: '',
    AccountTerminationTimestamp: '',
    CreatedAt: '',
    UpdatedAt: '',
};

export const USER_SESSION_DEFAULT_DATA: UserSessionObject = {
    user: DEFAULT_USER_OBJECT,

};

