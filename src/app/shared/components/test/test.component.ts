import { Component, computed, input, signal } from '@angular/core';
import { ExpandableMultiSelectComponent } from '../expandable-multi-select/expandable-multi-select.component';
import { Selectable } from '../../models/interfaces/selectable';

@Component({
    selector: 'app-test',
    imports: [],
    templateUrl: './test.component.html',
    styleUrl: './test.component.css'
})
export class TestComponent {

    options: Selectable[] = [
        { value: "1", name: "comedy" },
        { value: "2", name: "drama" },
        { value: "3", name: "romance" },
        { value: "4", name: "western" },
        { value: "5", name: "adventure" },
        { value: "6", name: "fantasy" },
        { value: "7", name: "documentary" },
    ]
}

