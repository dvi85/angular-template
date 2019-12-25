import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.module').then(mod => mod.AuthModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./feature/users/users.module').then(mod => mod.UsersModule)
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
