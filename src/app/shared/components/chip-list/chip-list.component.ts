import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-chip-list',
  imports: [],
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.css'
})
export class ChipListComponent {

    params: InputSignal<ChipListParams> = input.required()
}


interface ChipListParams {
    chips: string[] | number[]
    removable: boolean
}
