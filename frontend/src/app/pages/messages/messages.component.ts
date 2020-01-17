import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { LoggedInActive } from 'src/app/data/classes/state/LoggedInActive';
import { LoggedInAway } from 'src/app/data/classes/state/LoggedInAway';
import { Message } from './../../data/classes/Message';
import { PopUpComponent } from 'src/app/popup/popup.component';
import { Router } from '@angular/router';
import { User } from 'src/app/data/classes/User';
import { UserState } from '../../data/classes/state/UserState';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
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
        if (this.userState.canReceiveMessages()) {
            this.apiService.getMessagesMe().subscribe((value) => {
                this.messages = value;
                this.loading = false;
            }, () => {
                PopUpComponent.addError('We konden jouw berichten niet ophalen.');
                this.loading = false;
            });
        } else {
            PopUpComponent.addError('We kunnen jouw berichten niet ophalen, je bent momenteel in deze staat: ' + this.userState.stateTitle);
        }
    }

    messageDeleted(): void {
        this.apiService.deleteMessage(this.selectedMessage).subscribe(() => {
            this.loadMessages();
            PopUpComponent.addSuccess('We hebben je bericht verwijderd!');
        }, () => {
            PopUpComponent.addError('We konden jouw bericht niet verwijderen.');
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }

    sendMessage(messageToSend: Message): void {
        if (this.userState.canSendMessages()) {
            this.apiService.createMessage(messageToSend).subscribe(() => {
                PopUpComponent.addSuccess('We hebben je bericht verstuurd');
            }, () => {
                PopUpComponent.addError('We konden je bericht niet verzenden.');
            });
        } else {
            PopUpComponent.addError('We kunnen jouw bericht niet verzenden, je bent momenteel in deze staat: ' + this.userState.stateTitle);
        }
    }

    actionButtonClicked(newMessage: Message): void {
        this.selectedMessage = newMessage;
    }

    logout(): void {
        this.apiService.logout().subscribe(() => {
            PopUpComponent.addSuccess('We hebben je uitgelogd!');
            location.reload();
        }, () => {
            PopUpComponent.addError('We konden je niet uitloggen.');
        });
    }

    changedStatus() {
        console.log(this.userState.stateTitle)
        this.userState.changeStatus();
    }
}
