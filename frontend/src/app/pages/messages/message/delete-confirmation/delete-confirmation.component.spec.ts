import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { FeatherPipe } from '../../../../pipes/feather.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeleteConfirmationComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DeleteConfirmationComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(DeleteConfirmationComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
