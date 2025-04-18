import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { environment } from '../../../../../environments/environment.development';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import Metadata from '../../../../shared/models/interfaces/meta-data.interface';

@Component({
    selector: 'app-detailed-people-overview',
    imports: [ImageComponent, CardComponent, RouterLink],
    templateUrl: './detailed-people-overview.component.html',
    styleUrl: './detailed-people-overview.component.css'
})
export class DetailedPeopleOverviewComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    detailedPeople: Signal<DetailedPeople>

    constructor() {
        this.detailedPeople = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                console.log(data)
                return data["people"] as DetailedPeople
            })
        ), { requireSync: true })
    }
    get people(): DetailedPeople {
        return this.detailedPeople()!
    }

    get posterParams(): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: this.people.profilePath,
            type: "profile"
        }
    }

    get imdbUrl(): string {
        return `${environment.imdbUrl}${this.people.imdbId}`
    }

    getPeopleCardParams(image: DetailedPeople["images"][0]): CardParams {
        return {
            aspectRatio: image.aspectRatio,
            direction: "vertical",
            imageType: "profile",
            imageSrc: image.filePath
        }
    }

    createRecommendationCardParams(movie: DetailedPeople["filmography"]["top10LatestMovies"][0]): CardParams {
        return {
            imageType: "poster",
            direction: 'vertical',
            imageSrc: movie.posterImagePath,
            aspectRatio: { numerator: 2, denominator: 3 },
            href: ["/", "movies", movie.id.toString()]
        }
    }

    get metadata(): Metadata[] {
        const metadata: Metadata[] = []
        const birth: string = `${this.people.birthday}${this.people.deathday ? ' - ' + this.people.deathday : ""}`
        metadata.push({ value: birth })
        metadata.push({ value: this.people.placeOfBirth })
        return metadata
    }

}
