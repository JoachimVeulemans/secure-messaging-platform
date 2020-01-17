import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Message } from 'src/app/data/classes/Message';
import { PopUpComponent } from 'src/app/popup/popup.component';
import { Router } from '@angular/router';
import { User } from 'src/app/data/classes/User';
import { UserState } from '../../../data/classes/state/UserState';

@Component({
    selector: 'app-sent-messages',
    templateUrl: './sent-messages.component.html',
    styleUrls: ['./sent-messages.component.scss']
})
export class SentMessagesComponent implements OnInit {
    users: User[] = [];
    loading: Boolean = true;
    treeviewLoading: Boolean = true;
    messages: Message[] = [];
    selectedMessage: Message = new Message();
    userState: UserState = new UserState();

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit(): void {
        this.loadUsers();
        this.loadMessages();
        this.userState.stateTitle = 'Active';
    }

    usersLoaded(): void {
        this.treeviewLoading = false;
    }

    loadUsers(): void {
        this.apiService.getUserMe().subscribe((me) => {
            this.apiService.getAllUsers().subscribe((users) => {
                const returner = [];

                for (let i = 0; i < users.length; i++) {
                    users[i].name = users[i].firstname + ' ' + users[i].lastname;
                    users[i].type = 'user';
                    if (users[i]['_id'] !== me['_id']) {
                        returner.push(users[i]);
                    }
                }
                this.users = returner;
            }, () => {
                PopUpComponent.addError('We konden de gebruikers niet ophalen.');
            });
        }, () => {
            PopUpComponent.addError('We konden jouw gebruiker niet ophalen.');
        });
    }

    loadMessages(): void {
        this.apiService.getMessagesSentMe().subscribe((value) => {
            this.messages = value;
            this.loading = false;
        }, () => {
            PopUpComponent.addError('We konden jouw verzonden berichten niet ophalen.');
            this.loading = false;
        })
    }

    messageDeleted(): void {
        this.apiService.deleteMessage(this.selectedMessage).subscribe(() => {
            this.loadMessages();
            PopUpComponent.addSuccess('We hebben jouw bericht verwijderd.');
        }, () => {
            PopUpComponent.addError('We konden jouw bericht niet verwijderen.');
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }

    logout(): void {
        this.apiService.logout().subscribe(() => {
            PopUpComponent.addSuccess('We hebben je uitgelogd!');
            location.reload();
        }, () => {
            PopUpComponent.addError('We konden je niet uitloggen.');
        });
    }

    sendMessage(messageToSend: Message): void {
        this.apiService.createMessage(messageToSend).subscribe(() => {
            PopUpComponent.addSuccess('We hebben jouw bericht verzonden.');
            this.loadMessages();
        }, () => {
            PopUpComponent.addError('We konden je bericht niet verzenden.');
        })
    }

    actionButtonClicked(newMessage: Message) {
        this.selectedMessage = newMessage;
    }
    changedStatus() {
        console.log(this.userState.stateTitle)
        this.userState.changeStatus();
    }
}
