import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {UsermenuComponent} from '@app/UserDetails/usermenu.component';
import {SearchformComponent} from '@app/searchform/searchform.component';
import {ProfilesComponent} from '@app/profiles/profiles.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UsermenuComponent, canActivate: [AuthGuard]},
    { path: 'searchform', component: SearchformComponent, canActivate: [AuthGuard]},
    { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
