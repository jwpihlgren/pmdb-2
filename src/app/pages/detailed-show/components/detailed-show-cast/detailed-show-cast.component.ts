import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedShow } from '../../../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'app-detailed-show-cast',
    imports: [],
    templateUrl: './detailed-show-cast.component.html',
    styleUrl: './detailed-show-cast.component.css'
})
export class DetailedShowCastComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    detailedShow: Signal<DetailedShow>

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                console.log(data)
                return data["show"] as DetailedShow
            })
        ), { requireSync: true })
    }

}
