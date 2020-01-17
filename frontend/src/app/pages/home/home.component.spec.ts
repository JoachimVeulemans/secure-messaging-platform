import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { FeatherPipe } from '../../pipes/feather.pipe';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopUpComponent } from '../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HomeComponent, PopUpComponent, NavbarComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler, AuthService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(HomeComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
