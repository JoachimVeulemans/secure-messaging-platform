import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeleteConfirmationComponent } from './pages/messages/message/delete-confirmation/delete-confirmation.component';
import { FeatherPipe } from './pipes/feather.pipe';
import { FileNotFoundComponent } from './pages/file-not-found/file-not-found.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './pages/messages/message/message.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NewMessageComponent } from './pages/messages/new-message/new-message.component';
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PopUpComponent } from './popup/popup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { SentMessagesComponent } from './pages/messages/sent-messages/sent-messages.component';
import { TreeviewComponent } from './pages/messages/treeview/treeview.component';
import { TreeviewItemComponent } from './pages/messages/treeview-item/treeview-item.component';
import { TreeviewService } from './pages/messages/treeview/treeview.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HomeComponent,
        FileNotFoundComponent,
        NavbarComponent,
        MessagesComponent,
        NewMessageComponent,
        MessageComponent,
        TreeviewComponent,
        TreeviewItemComponent,
        DeleteConfirmationComponent,
        ProfileComponent,
        SentMessagesComponent,
        FeatherPipe,
        PopUpComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    providers: [
        AuthGuardService,
        AuthService,
        TreeviewService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
