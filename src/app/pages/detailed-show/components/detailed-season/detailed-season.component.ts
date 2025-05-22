import { Component, inject, Signal } from '@angular/core';
import { DetailedSeason } from '../../../../shared/models/interfaces/detailed-season';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-detailed-season',
  imports: [],
  templateUrl: './detailed-season.component.html',
  styleUrl: './detailed-season.component.css'
})
export class DetailedSeasonComponent {
    
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    detailedSeason: Signal<DetailedSeason | undefined>

    constructor() {
        this.detailedSeason = toSignal(this.activatedRoute.data.pipe(
            map(data => {
                console.log(data["season"])
                return data["season"] as DetailedSeason
            })
        ))
    }
}
