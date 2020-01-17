import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { FeatherPipe } from '../../pipes/feather.pipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopUpComponent } from '../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DashboardComponent, PopUpComponent, NavbarComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
