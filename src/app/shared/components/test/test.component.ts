import { Component, computed, input, signal } from '@angular/core';
import { ExpandableMultiSelectComponent } from '../expandable-multi-select/expandable-multi-select.component';

@Component({
    selector: 'app-test',
    imports: [ExpandableMultiSelectComponent],
    templateUrl: './test.component.html',
    styleUrl: './test.component.css'
})
export class TestComponent {

    options = [
        {id: 1, name: "comedy"},
        {id: 2, name: "drama"},
        {id: 3, name: "romance"},
        {id: 4, name: "western"},
        {id: 5, name: "adventure"},
        {id: 6, name: "fantasy"},
        {id: 7, name: "documentary"},
    ]
}

