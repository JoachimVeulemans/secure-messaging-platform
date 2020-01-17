import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { FeatherPipe } from '../../pipes/feather.pipe';
import { NavbarComponent } from './navbar.component';
import { PopUpComponent } from '../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeviewItemComponent } from '../messages/treeview-item/treeview-item.component';

describe('NavbarComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [NavbarComponent, PopUpComponent, FeatherPipe, TreeviewItemComponent],
            providers: [HttpClient, HttpHandler, AuthService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(NavbarComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
