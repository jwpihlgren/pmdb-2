import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import DetailedPeople from '../../shared/models/interfaces/detailed-people';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageContainerComponent } from '../../shared/components/page-container/page-container.component';

@Component({
    selector: 'app-detailed-people',
    imports: [RouterOutlet, PageContainerComponent],
    templateUrl: './detailed-people.component.html',
    styleUrl: './detailed-people.component.css'
})
export class DetailedPeopleComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)

    detailedPeople: Signal<DetailedPeople>
    constructor() {
        this.detailedPeople = toSignal(this.activatedRoute.data.pipe(
            map(data => {
                const people: DetailedPeople  = data["people"] as DetailedPeople
                return people
            })
        ), {requireSync: true})
    }
}


