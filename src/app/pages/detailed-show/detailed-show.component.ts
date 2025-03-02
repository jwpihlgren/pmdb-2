import { Component, inject, Signal } from '@angular/core';
import { DetailedShowService } from '../../shared/services/detailed-show.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TmdbDetailedShow } from '../../shared/models/classes/tmdb-detailed-show';

@Component({
  selector: 'app-detailed-show',
  standalone: true,
  imports: [],
  templateUrl: './detailed-show.component.html',
  styleUrl: './detailed-show.component.css'
})
export class DetailedShowComponent {
    detailedShow: Signal<TmdbDetailedShow | undefined>

    protected detailedShowService = inject(DetailedShowService)
    protected activatedRoute = inject(ActivatedRoute)
    constructor(){
        const id = this.activatedRoute.snapshot.paramMap.get("id")!
        this.detailedShow = toSignal(this.detailedShowService.get(id))
    }
}
