import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from './../../../services/api.service';
import { Message } from './../../../data/classes/Message';
import { PopUpComponent } from './../../../popup/popup.component';
import { User } from 'src/app/data/classes/User';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
    @Input() message = new Message();
    @Output() actionButtonClicked: EventEmitter<Message> = new EventEmitter<Message>();
    filename = '';
    filedata: SafeResourceUrl = '';

    constructor(private sanitizer: DomSanitizer, private apiService: ApiService) { }

    ngOnInit(): void {
        this.message = new Message().toDocumentSpec(this.message);
        this.prepareDownload();
        this.getReceiver();
        this.getSender();
    }

    getSender(): void {
        this.apiService.getUser(this.message.sender).subscribe((value) => {
            this.message.sender = value;
        }, () => {
            PopUpComponent.addError('We konden de verzender niet ophalen.');
        });
    }

    getReceiver(): void {
        this.apiService.getUser(this.message.receiver).subscribe((value) => {
            this.message.receiver = value;
        }, () => {
            PopUpComponent.addError('We konden de ontvanger niet ophalen.');
        });
    }

    reply(): void {
        const newMessage = new Message().hardCopy(this.message);

        newMessage.title = 'RE: ' + newMessage.title;
        newMessage.content = '\n\nVorig bericht:\n' + newMessage.content
        newMessage.receiver = this.message.sender;
        this.actionButtonClicked.emit(newMessage);
    }

    forward(): void {
        const newMessage = new Message().hardCopy(this.message);

        newMessage.title = 'FW: ' + newMessage.title;
        newMessage.content = '\n\nVorig bericht:\n' + newMessage.content
        newMessage.receiver = new User();
        this.actionButtonClicked.emit(newMessage);
    }

    delete(): void {
        this.actionButtonClicked.emit(this.message);
    }

    prepareDownload(): void {
        if (this.message.filename !== undefined && this.message.filedata !== undefined && this.message.filename !== '' && this.message.filedata !== '') {
            this.filename = this.message.filename;
            const blob = this.base64toBlob(atob(this.message.filedata.toString().split(',')[1]));

            this.filedata = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
    }

    base64toBlob(byteString): Blob {
        const ia = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: 'octet/stream' });
    }
}
