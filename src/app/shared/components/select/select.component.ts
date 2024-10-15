import { Component } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

    options: selectParams[] = [
        {value: 1, name: "horror"},
        {value: 2, name: "action"},
        {value: 3, name: "comedy"},
        {value: 3, name: "drama"},

    ]
}


interface selectParams {
    value: number
    name: string
}
