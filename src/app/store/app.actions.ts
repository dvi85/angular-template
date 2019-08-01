import {AppUser} from "./app.user";

export class AppLoginSuccessAction {
    static readonly type = 'Login Success';
    constructor(public appUser: AppUser) {}
}

export class AppLogoutAction {
    static readonly type = 'Logout';
}