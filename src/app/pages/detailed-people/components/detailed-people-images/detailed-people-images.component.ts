import { Component, inject, Signal } from '@angular/core';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { Image } from '../../../../shared/models/interfaces/image';

@Component({
    selector: 'app-detailed-people-images',
    imports: [RouterLink, CardComponent],
    templateUrl: './detailed-people-images.component.html',
    styleUrl: './detailed-people-images.component.css'
})
export class DetailedPeopleImagesComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    detailedPeople: Signal<DetailedPeople>

    constructor() {
        this.detailedPeople = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                return data["people"] as DetailedPeople
            })
        ), { requireSync: true })
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }

    createParams(image: Image): CardParams {
        return {
            aspectRatio: image.aspectRatio,
            imageSrc: image.filePath,
            direction: image.width > image.height ? "horizontal" : "vertical",
            imageType: "poster"
        }
    }
}
