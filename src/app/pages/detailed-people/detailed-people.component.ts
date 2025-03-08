import { Component, inject, Signal } from '@angular/core';
import { DetailedPeopleService } from '../../shared/services/detailed-people.service';
import DetailedPeople from '../../shared/models/interfaces/detailed-people';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-detailed-people',
    imports: [ImageComponent, DecimalPipe],
    templateUrl: './detailed-people.component.html',
    styleUrl: './detailed-people.component.css'
})
export class DetailedPeopleComponent {
    protected activatedRoute = inject(ActivatedRoute)
    protected detailedPeopleService = inject(DetailedPeopleService)
    detailedPeople: Signal<DetailedPeople | undefined>

    constructor() {
        this.detailedPeople = toSignal(
            this.activatedRoute.paramMap.pipe(
                switchMap(data => {
                    console.log(data)
                    const id = parseInt(data.get("id")!)
                    return this.detailedPeopleService.get(id)
                })
            )
        )
    }

    get people(): DetailedPeople {
        return this.detailedPeople()!
    }

    get posterParams(): ImageParams {
        return {
            aspectRatio: {numerator: 2, denominator: 3},
            src: this.people.profilePath,
            type: "profile" 
        }
    }

    get imdbUrl(): string {
        return `${environment.imdbUrl}${this.people.imdbId}`
    }
}
