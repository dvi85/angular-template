import {environment} from "../environments/environment";
export const AUTH_SERVER_URL = environment.authServerUrl;
export const AUTH_URL =  `${AUTH_SERVER_URL}/api/login`;
export const ACCESS_TOKEN = `accessToken`;
export const EXPIRES_IN = `expires_in`;




