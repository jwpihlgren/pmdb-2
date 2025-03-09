import { Component, inject, Signal } from '@angular/core';
import { DetailedPeopleService } from '../../shared/services/detailed-people.service';
import DetailedPeople from '../../shared/models/interfaces/detailed-people';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { ImageService } from '../../shared/services/image.service';
import { CardComponent, CardParams } from '../../shared/components/card/card.component';
import { MetadataOverride } from '@angular/core/testing';
import Metadata from '../../shared/models/interfaces/meta-data.interface';

@Component({
    selector: 'app-detailed-people',
    imports: [ImageComponent, DecimalPipe, CardComponent],
    templateUrl: './detailed-people.component.html',
    styleUrl: './detailed-people.component.css'
})
export class DetailedPeopleComponent {
    protected activatedRoute = inject(ActivatedRoute)
    protected detailedPeopleService = inject(DetailedPeopleService)
    protected imageService = inject(ImageService)
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

    getPeopleCardParams(image: DetailedPeople["images"][0]): CardParams {
        return{
            aspectRatio: image.aspectRatio,
            direction: "vertical",
            imageType: "profile",
            imageSrc: image.filePath
        }
    }

    get metadata(): Metadata[] {
        const metadata: Metadata[] = []
        const birth: string = `${this.people.birthday}${this.people.deathday ? ' - ' + this.people.deathday : ""}`
        metadata.push({value: birth})
        metadata.push({value: this.people.placeOfBirth})
        return metadata
    }
}


