import { Component, input, InputSignal } from '@angular/core';
import { ResultShow } from '../../../../models/interfaces/result-show';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-content-show',
    imports: [DecimalPipe],
    templateUrl: './content-show.component.html',
    styleUrl: './content-show.component.css'
})
export class ContentShowComponent {

    params: InputSignal<ResultShow> = input.required<ResultShow>()
}
