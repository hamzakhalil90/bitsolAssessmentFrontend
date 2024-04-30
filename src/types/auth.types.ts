

export type AuthTokens = {
    AccessToken: string;
    RefreshToken: string;
    csrftoken?: string;
    sessionid?: string;
};

export type LoginCredentials = {
    Email: string;
    Password: string;
};

export interface IUserObject {
id:number,
username:string
email:string
    organization:string;
    is_staff:boolean
}




export type JwtDecodedObject = {
    exp: number;
    iat: number;
    jti: string;
    user_id: number;

};

export type UserSessionObject = {
    user: any;
};
