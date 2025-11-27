import { NgOptimizedImage } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ImageService } from '../../shared/services/image.service';
import { DetailedShow } from '../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PageContainerComponent } from '../../shared/components/page-container/page-container.component';

@Component({
  selector: 'app-detailed-show',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, PageContainerComponent],
  templateUrl: './detailed-show.component.html',
  styleUrl: './detailed-show.component.css'
})
export class DetailedShowComponent {
    protected imageService: ImageService = inject(ImageService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    detailedShow: Signal<DetailedShow>
    

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.data.pipe(
            map(data => {
                const show = data["show"] as DetailedShow
                return show
            })
        ), {requireSync: true})
    }
    sanitizeUrl(url: string): string {
        return this.imageService.sanitizeImageUrl(url)
    }
}
