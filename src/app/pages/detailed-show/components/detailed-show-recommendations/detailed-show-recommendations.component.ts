import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedShow } from '../../../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-detailed-show-recommendations',
  imports: [],
  templateUrl: './detailed-show-recommendations.component.html',
  styleUrl: './detailed-show-recommendations.component.css'
})
export class DetailedShowRecommendationsComponent {
   protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    detailedShow: Signal<DetailedShow>

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                console.log(data)
                return data["show"] as DetailedShow
            })
        ), {requireSync: true})
    }

}
