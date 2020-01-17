import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FeatherPipe } from '../../pipes/feather.pipe';
import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ProfileComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(ProfileComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
