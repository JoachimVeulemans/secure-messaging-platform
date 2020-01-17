import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from './../../../services/api.service';
import { AppInsights } from 'applicationinsights-js';
import { Message } from './../../../data/classes/Message';
import { PopUpComponent } from 'src/app/popup/popup.component';
import { TreeviewService } from '../treeview/treeview.service';
import { User } from 'src/app/data/classes/User';

@Component({
    selector: 'app-new-message',
    templateUrl: './new-message.component.html',
    styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
    @Input() message: Message;
    @Output() messageSend: EventEmitter<object> = new EventEmitter<object>();
    @Output() usersLoaded: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    filename = '';
    filedata: SafeResourceUrl = '';

    dropdownSettings = {
        singleSelection: true,
        idField: '_id',
        textField: 'firstname',
        itemsShowLimit: 10,
        allowSearchFilter: false,
        enableCheckAll: false,
        maxHeight: 1000,
        defaultOpen: true,
        searchPlaceholderText: 'Zoeken',
        noDataAvailablePlaceholderText: 'Geen gebruikers beschikbaar',
        selectAllText: 'Selecteer alle gebruikers',
        unSelectAllText: 'Deselecteer alle gebruikers'
    };
    allUsers: User[] = [];
    selectedUsers: User[] = [];

    constructor(private apiService: ApiService, private treeviewService: TreeviewService, private sanitizer: DomSanitizer) {
        this.treeviewService.selectedItem$.subscribe((value: User) => {
            this.selectUser(value);
        });
        AppInsights.trackPageView('NewMessage');
    }

    ngOnInit(): void {
        this.loadUsers();
    }

    selectUser(user: User): void {
        this.selectedUsers = [];
        for (let i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i]['_id'] === user['_id']) {
                this.selectedUsers.push(this.allUsers[i]);
            }
        }
        this.message = new Message();
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
                this.allUsers = returner;
                this.usersLoaded.emit(true);
            }, () => {
                PopUpComponent.addError('We konden de gebruikers niet ophalen.');
            });
        }, () => {
            PopUpComponent.addError('We konden jouw gebruiker niet ophalen.');
        });
    }

    handleFileInput(files: FileList): void {
        const fileToUpload = files.item(0);
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            this.filename = fileToUpload.name;
            this.filedata = fileReader.result;
        }
        fileReader.readAsDataURL(fileToUpload)
    }

    sendMessage(title: string, content: string): void {
        this.message.title = title;
        this.message.content = content;
        this.message.receiver = this.selectedUsers[0];
        this.message.filename = this.filename;
        this.message.filedata = this.filedata;
        this.apiService.getUserMe().subscribe((value) => {
            this.message.sender = value;
            this.messageSend.emit(this.message);
        }, () => {
            PopUpComponent.addError('We konden de jouw bericht niet verzenden (fout ophalen huidige gebruiker).');
        });
    }
}
