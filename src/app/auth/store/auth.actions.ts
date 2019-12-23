import {Credentials} from "./credentials";

export class AuthLoginAction {
    static readonly type = 'Login';
    constructor(public credentials: Credentials) {}
}

export class AuthLoginFailed {
    static readonly type = 'Login failed';
}