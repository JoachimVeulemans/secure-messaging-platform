import { Component, Input } from '@angular/core';
import { TreeviewService } from './treeview.service';

@Component({
    selector: 'app-treeview',
    templateUrl: './treeview.component.html',
    styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent {
    @Input() data = [];
    selectedItem: object;

    constructor(private treeviewService: TreeviewService) {
        treeviewService.selectedItem$.subscribe(
            (selectedItem) => {
                this.selectedItem = selectedItem;
            }
        );
    }
}
