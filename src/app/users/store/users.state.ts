import {Action, State, StateContext} from "@ngxs/store";
import {SearchAction} from "./users.actions";

export interface UsersStateModel {
    search?: string
}

@State<UsersStateModel>({
    name: 'users',
    defaults: {}
})
export class UsersState {

   @Action(SearchAction)
   search(ctx: StateContext<UsersStateModel>, action: SearchAction) {
       const state = ctx.getState();
       ctx.setState({
           ...state,
           search: action.search
       });
   }

}