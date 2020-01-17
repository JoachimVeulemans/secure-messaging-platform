import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FileNotFoundComponent } from './file-not-found.component';
import { PopUpComponent } from '../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FileNotFoundComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [FileNotFoundComponent, PopUpComponent],
            providers: [HttpClient, HttpHandler]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(FileNotFoundComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
