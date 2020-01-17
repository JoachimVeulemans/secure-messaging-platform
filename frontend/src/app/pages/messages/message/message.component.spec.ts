import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FeatherPipe } from '../../../pipes/feather.pipe';
import { MessageComponent } from './message.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { PopUpComponent } from '../../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MessageComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [MessageComponent, PopUpComponent, NavbarComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(MessageComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
