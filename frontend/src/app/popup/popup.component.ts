import { Component } from '@angular/core';

class Message {
    private static ttl = 5000;

    private expired: boolean;
    private faded: boolean;
    private text: string;
    private type: string;

    constructor(text: string, type: string) {
        this.text = text;
        this.type = type;

        setTimeout(() => {
            this.dismiss();
        }, Message.ttl);
    }

    dismiss(): void {
        this.faded = true;

        setTimeout(() => {
            this.expired = true;
        }, 1000);
    }

    dismissInstant(): void {
        this.expired = true;
    }

    getOpacity(): number {
        return 1;
    }

    getText(): string {
        return this.text;
    }

    getType(): string {
        return this.type;
    }

    isExpired(): boolean {
        return this.expired;
    }

    isFaded(): boolean {
        return this.faded;
    }
}

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopUpComponent {
    static messages = new Array<Message>();
    static successMessage = 'Succes!';
    static errorMessagePart1 = 'Er heeft zich een error voorgedaan!';
    static errorMessagePart2 = 'Gelieve opnieuw te proberen of een administrator te contacteren!';

    private static add(text: string, type: string) {
        if (PopUpComponent.messages.length >= 5) {
            PopUpComponent.messages[0].dismissInstant();
        }

        PopUpComponent.messages.push(new Message(text, type));
    }

    static addSuccess(message) {
        message = PopUpComponent.successMessage + ' ' + message;
        this.add(message, 'success');
    }

    static addError(message) {
        message = PopUpComponent.errorMessagePart1 + ' ' + message + ' ' + PopUpComponent.errorMessagePart2;
        this.add(message, 'danger');
    }

    constructor() { }

    getMessages() {
        PopUpComponent.messages = PopUpComponent.messages.filter((message) => { return !message.isExpired() });
        return PopUpComponent.messages;
    }
}
