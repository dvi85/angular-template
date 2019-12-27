import {environment} from "../environments/environment";
export const AUTH_SERVER_URL = environment.authServerUrl;
export const AUTH_URL =  `${AUTH_SERVER_URL}/api/login`;
export const URL_USERS =  `${AUTH_SERVER_URL}/api/users`;
export const URL_CURRENT_USER = `${AUTH_SERVER_URL}/api/user/info`;
export const URL_BLOCK_USER = (id: number) => `${AUTH_SERVER_URL}/api/user/${id}/block`;
export const URL_UNBLOCK_USER = (id: number) => `${AUTH_SERVER_URL}/api/user/${id}/unblock`;
export const ACCESS_TOKEN = `accessToken`;
export const EXPIRES_IN = `expires_in`;




