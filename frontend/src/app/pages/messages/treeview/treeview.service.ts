import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TreeviewService {
    private selectedItemSource = new Subject<object>();
    private selectedGroupSource = new Subject<object>();

    selectedItem$ = this.selectedItemSource.asObservable();
    selectedGroup$ = this.selectedGroupSource.asObservable();

    selectItem(item: object) {
        this.selectedItemSource.next(item);
    }

    selectGroup(item: object) {
        this.selectedGroupSource.next(item);
    }
}
