import { Component, Input } from '@angular/core';
import { TreeviewService } from '../treeview/treeview.service';

declare var $;

@Component({
    selector: 'app-treeview-item',
    templateUrl: './treeview-item.component.html',
    styleUrls: ['./treeview-item.component.scss']
})
export class TreeviewItemComponent {
    @Input() data = [];

    constructor(private treeviewService: TreeviewService) { }

    selectItem(item): void {
        this.treeviewService.selectItem(item);
    }

    selectGroup(item): void {
        this.treeviewService.selectGroup(item);

        // jQuery returns an array with only one item apparently
        const collapse = $(`#id_${item.id}`)[0];
        const iOpen = $(`#iOpen_${item.id}`)[0];
        const iClose = $(`#iClose_${item.id}`)[0];

        // Don't do anything while the list is still collapsing
        if (collapse.classList.contains('collapsing')) {
            return;
        }

        // Show and hide the correct icons when the collapse is collapsed or not.
        if (collapse.classList.contains('show')) {
            iOpen.classList.add('d-none');
            iClose.classList.remove('d-none');
        } else {
            iOpen.classList.remove('d-none');
            iClose.classList.add('d-none');
        }
    }
}
