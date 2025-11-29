import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { environment } from '../../../../../environments/environment.development';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import Metadata from '../../../../shared/models/interfaces/meta-data.interface';
import { RoutingService } from '../../../../shared/services/routing.service';
import OverflowRowOptions, { OverflowRowComponent } from '../../../../shared/components/overflow-row/overflow-row.component';
import { ContentHeroComponent } from '../../../../shared/components/content-hero/content-hero.component';
import { ContentWithSidebarComponent } from '../../../../shared/components/content-with-sidebar/content-with-sidebar.component';

@Component({
    selector: 'app-detailed-people-overview',
    imports: [ImageComponent, CardComponent, OverflowRowComponent, ContentHeroComponent, ContentWithSidebarComponent],
    templateUrl: './detailed-people-overview.component.html',
    styleUrl: './detailed-people-overview.component.css'
})
export class DetailedPeopleOverviewComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected routingService: RoutingService = inject(RoutingService)
    detailedPeople: Signal<DetailedPeople>

    constructor() {
        this.detailedPeople = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                return data["people"] as DetailedPeople
            })
        ), { requireSync: true })
    }

    imageOptions = computed<OverflowRowOptions>(() => ({
        title: "Images",
        showMoreLink: ["images"],
        fallbackText: "No images",
        fallback: this.detailedPeople().images.length === 0
    }))

    topMoviesOptions = computed<OverflowRowOptions>(() => ({
        title: `Movies (${this.detailedPeople().filmography.allMovies.length})`,
        showMoreLink: ["cast","movies"],
        fallbackText: "No movies",
        fallback: this.detailedPeople().images.length === 0
    }))

    topShowsOptions = computed<OverflowRowOptions>(() => ({
        title: `Shows (${this.detailedPeople().filmography.allShows.length})`,
        showMoreLink: ["cast","shows"],
        fallbackText: "No shows",
        fallback: this.detailedPeople().images.length === 0
    }))


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
        return `${environment.imdbPeopleUrl}${this.people.imdbId}`
    }

    getPeopleCardParams(image: DetailedPeople["images"][0]): CardParams {
        return {
            aspectRatio: image.aspectRatio,
            direction: "vertical",
            imageType: "profile",
            imageSrc: image.filePath
        }
    }

    createCastMoviesCardParams(movie: DetailedPeople["filmography"]["top10LatestMovies"][0]): CardParams {
        return {
            imageType: "poster",
            direction: 'vertical',
            imageSrc: movie.posterImagePath,
            aspectRatio: { numerator: 2, denominator: 3 },
            href: ["/", this.routingService.stubs.MOVIE, movie.id.toString()]
        }
    }
    createCastShowsCardParams(show: DetailedPeople["filmography"]["top10LatestShows"][0]): CardParams {
        return {
            imageType: "poster",
            direction: 'vertical',
            imageSrc: show.posterImagePath,
            aspectRatio: { numerator: 2, denominator: 3 },
            href: ["/", this.routingService.stubs.SHOW, show.id.toString()]
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
