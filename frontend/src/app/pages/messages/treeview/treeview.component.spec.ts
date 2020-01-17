import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FeatherPipe } from '../../../pipes/feather.pipe';
import { NavbarComponent } from '../../navbar/navbar.component';
import { PopUpComponent } from '../../../popup/popup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeviewComponent } from './treeview.component';
import { TreeviewItemComponent } from '../treeview-item/treeview-item.component';
import { TreeviewService } from './treeview.service';

describe('TreeviewComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TreeviewComponent, PopUpComponent, NavbarComponent, TreeviewItemComponent, FeatherPipe],
            providers: [HttpClient, HttpHandler, TreeviewService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(TreeviewComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });
});
