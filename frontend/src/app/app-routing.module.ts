import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FileNotFoundComponent } from './pages/file-not-found/file-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { SentMessagesComponent } from './pages/messages/sent-messages/sent-messages.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        component: DashboardComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'messages',
        canActivate: [AuthGuardService],
        component: MessagesComponent
    },
    {
        path: 'sent-messages',
        canActivate: [AuthGuardService],
        component: SentMessagesComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuardService],
        component: ProfileComponent
    },
    {
        path: '**',
        component: FileNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
