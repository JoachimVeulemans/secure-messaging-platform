import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { PopUpComponent } from './popup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PopUpComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PopUpComponent],
            providers: [HttpClient, HttpHandler]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(PopUpComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
