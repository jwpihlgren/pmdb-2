import { Component, input, InputSignal} from '@angular/core';
import { TrendingMovie } from '../../models/interfaces/trending-movie';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.css'
})
export class CardMovieComponent {

    readonly params: InputSignal<TrendingMovie | undefined> = input()
    

}


interface CardMovieParams {

}
