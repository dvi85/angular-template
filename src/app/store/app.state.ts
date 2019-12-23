import {Action, State, StateContext} from "@ngxs/store";
import {AppUser} from "./app.user";
import {AppLoginSuccessAction, AppLogoutAction, AppLogoutSuccessAction} from "./app.actions";
import {Navigate} from "@ngxs/router-plugin";


export interface AppStateModel{
    appUser?: AppUser
}

@State<AppStateModel>({
    name: 'app',
    defaults: {}
})
export class AppState {

    @Action(AppLoginSuccessAction)
    login(ctx: StateContext<AppStateModel>, action: AppLoginSuccessAction) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            appUser: action.appUser
        });
        ctx.dispatch(new Navigate(['/users/list']));
    }

    @Action(AppLogoutAction)
    logout(ctx: StateContext<AppStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            appUser: null
        });
        ctx.dispatch(new Navigate(['/']));
    }

    @Action(AppLogoutSuccessAction)
    logoutSucess(ctx: StateContext<AppStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            appUser: null
        });
        ctx.dispatch(new Navigate(['/']));
    }
}