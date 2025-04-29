import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { Image } from '../../../../shared/models/interfaces/image';
import { LightboxComponent, LightboxParams } from '../../../../shared/components/lightbox/lightbox.component';

@Component({
    selector: 'app-detailed-people-images',
    imports: [RouterLink, CardComponent, LightboxComponent],
    templateUrl: './detailed-people-images.component.html',
    styleUrl: './detailed-people-images.component.css'
})
export class DetailedPeopleImagesComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    detailedPeople: Signal<DetailedPeople>
    lightboxOpen: WritableSignal<number | undefined > = signal(undefined)

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
    createLightboxImageParams(images: Image[]): LightboxParams{
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
        console.log("click")
        this.lightboxOpen.set(undefined)
        console.log(this.lightboxOpen())
    }
}
