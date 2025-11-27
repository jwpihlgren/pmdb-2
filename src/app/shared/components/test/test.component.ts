import { Component } from '@angular/core';
import { Selectable } from '../../models/interfaces/selectable';
import { SimpleGridComponent } from '../simple-grid/simple-grid.component';

@Component({
    selector: 'app-test',
    imports: [SimpleGridComponent],
    templateUrl: './test.component.html',
    styleUrl: './test.component.css'
})
export class TestComponent {

    options: Selectable[] = [
        { value: "red", name: "red" },
        { value: "blue", name: "blue" },
        { value: "green", name: "green" },
        { value: "red", name: "red" },
        { value: "blue", name: "blue" },
        { value: "green", name: "green" },
        { value: "red", name: "red" },
        { value: "blue", name: "blue" },
        { value: "green", name: "green" },
    ]
}
