import { Component, Signal } from '@angular/core';
import { ShowDetailService } from '../../shared/services/show-detail.service';
import { DetailedShow } from '../../shared/models/interfaces/detailed-show';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-detailed-show',
  standalone: true,
  imports: [],
  templateUrl: './detailed-show.component.html',
  styleUrl: './detailed-show.component.css'
})
export class DetailedShowComponent {
    detailedShow: Signal<DetailedShow | undefined>

    constructor(private showDetailService: ShowDetailService, activatedRoute: ActivatedRoute){
        const id = activatedRoute.snapshot.paramMap.get("id")!
        this.detailedShow = toSignal(this.showDetailService.get(id))
    }
}
