import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { Image } from '../../../../shared/models/interfaces/image';
import { LightboxComponent, LightboxParams } from '../../../../shared/components/lightbox/lightbox.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { SimpleGridComponent } from '../../../../shared/components/simple-grid/simple-grid.component';
import { DetailedMovie } from '../../../../shared/models/interfaces/detailed-movie';

@Component({
    selector: 'app-posters',
    imports: [RouterLink, CardComponent, LightboxComponent, SimpleGridComponent],
    templateUrl: './posters.component.html',
    styleUrl: './posters.component.css'
})
export class PostersComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    posters: Signal<DetailedMovie["images"]["posters"]>
    lightboxOpen: WritableSignal<number | undefined> = signal(undefined)

    constructor() {
        this.posters = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                console.log(data)
                return data['movie']['images']['posters'] as DetailedMovie["images"]["posters"]
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
    createLightboxImageParams(images: Image[]): LightboxParams {
        return {
            images: images.map((image, index) => {
                return {
                    aspectRatio: { numerator: 2, denominator: 3 },
                    src: image.filePath,
                    priority: index === 0 ? true : false,
                    type: "profile",
                }
            }
            )
        }
    }

    openLightbox(index: number): void {
        this.lightboxOpen.set(index)
    }

    closeLightbox(): void {
        this.lightboxOpen.set(undefined)
    }

}
