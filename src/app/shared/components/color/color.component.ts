import { Component } from '@angular/core';
import { CardGridComponent } from '../card-grid/card-grid.component';
import { CardLoadingComponent } from '../card-loading/card-loading.component';

@Component({
    selector: 'app-color',
    imports: [CardGridComponent, CardLoadingComponent],
    templateUrl: './color.component.html',
    styleUrl: './color.component.css',
    standalone: true
})
export class ColorComponent {

}
