import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
    styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
    @Input() object: any;
    @Input() displayedFieldname: string;
    @Input() id: string;
    @Output() confirmDeletion: EventEmitter<object> = new EventEmitter<object>();

    constructor() { }

    confirm() {
        this.confirmDeletion.emit(this.object);
    }
}
