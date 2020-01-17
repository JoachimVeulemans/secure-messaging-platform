import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { DeleteConfirmationComponent } from '../message/delete-confirmation/delete-confirmation.component';
import { FeatherPipe } from '../../../pipes/feather.pipe';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../message/message.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NewMessageComponent } from '../new-message/new-message.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PopUpComponent } from '../../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SentMessagesComponent } from './sent-messages.component';
import { TreeviewComponent } from '../treeview/treeview.component';
import { TreeviewItemComponent } from '../treeview-item/treeview-item.component';
import { TreeviewService } from '../treeview/treeview.service';

describe('SentMessagesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NgMultiSelectDropDownModule, FormsModule, BrowserModule],
            declarations: [SentMessagesComponent, PopUpComponent, NavbarComponent, TreeviewComponent, FeatherPipe, MessageComponent, DeleteConfirmationComponent, NewMessageComponent, TreeviewItemComponent],
            providers: [HttpClient, HttpHandler, TreeviewService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(SentMessagesComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
