import { NgOptimizedImage } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ImageService } from '../../shared/services/image.service';
import { DetailedShow } from '../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DetailedMovie } from '../../shared/models/interfaces/detailed-movie';

@Component({
  selector: 'app-detailed-show',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './detailed-show.component.html',
  styleUrl: './detailed-show.component.css'
})
export class DetailedShowComponent {
    protected imageService: ImageService = inject(ImageService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected titleService: Title = inject(Title)
    detailedShow: Signal<DetailedShow>
    

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.data.pipe(
            map(data => {
                const show = data["show"] as DetailedShow
                this.titleService.setTitle(`Pmdb2 - ${show.name} (${show.firstAirDate})`)
                return show
            })
        ), {requireSync: true})
    }
    sanitizeUrl(url: string): string {
        return this.imageService.sanitizeImageUrl(url)
    }
}
