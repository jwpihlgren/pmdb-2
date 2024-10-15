import { Component } from '@angular/core';
import { SelectComponent } from '../../shared/components/select/select.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    filterForm = new FormGroup({
        genres: new FormControl([])
    })
}
