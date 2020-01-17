import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherPipe } from '../../../pipes/feather.pipe';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NewMessageComponent } from './new-message.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PopUpComponent } from '../../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeviewService } from '../treeview/treeview.service';

describe('NewMessageComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NgMultiSelectDropDownModule, FormsModule, BrowserModule],
            declarations: [NewMessageComponent, PopUpComponent, NavbarComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler, TreeviewService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(NewMessageComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
