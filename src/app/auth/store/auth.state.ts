import { State, Action, StateContext } from '@ngxs/store';
import {AuthService} from "../auth.service";
import {AppLoginSuccessAction} from "../../store/app.actions";
import {AuthLoginAction, AuthLoginFailed} from "./auth.actions";
import {AppUser} from "../../store/app.user";

export interface AuthStateModel {
    authFailed: boolean;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {authFailed: false}
})
export class AuthState {

    constructor(private authService: AuthService) {}

    @Action(AuthLoginAction)
    login(ctx: StateContext<AuthStateModel>, action: AuthLoginAction) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            authFailed: false
        });
        this.authService.login(action.credentials).subscribe(
            appUser => ctx.dispatch(new AppLoginSuccessAction(new AppUser(action.credentials.login))),
            error => ctx.dispatch(new AuthLoginFailed()));
    }

    @Action(AuthLoginFailed)
    loginFailed(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            authFailed: true
        });
    }
}