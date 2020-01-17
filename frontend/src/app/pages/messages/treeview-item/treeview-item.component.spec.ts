import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FeatherPipe } from '../../../pipes/feather.pipe';
import { NavbarComponent } from '../../navbar/navbar.component';
import { PopUpComponent } from '../../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeviewItemComponent } from './treeview-item.component';
import { TreeviewService } from '../treeview/treeview.service';

describe('TreeviewItemComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TreeviewItemComponent, PopUpComponent, NavbarComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler, TreeviewService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(TreeviewItemComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
