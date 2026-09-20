import { Component, computed, ElementRef, inject, input, InputSignal, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const EMBED_BASE: Record<string, string> = {
    youtube: "https://www.youtube-nocookie.com/embed/",
    vimeo: "https://player.vimeo.com/video/"
}

@Component({
    selector: 'app-external-video-player',
    imports: [],
    templateUrl: './external-video-player.component.html',
    styleUrl: './external-video-player.component.css'
})
export class ExternalVideoPlayerComponent {
    protected sanitizer: DomSanitizer = inject(DomSanitizer)

    params: InputSignal<ExternalVideoPlayerParams> = input.required()

    protected dialog: Signal<ElementRef<HTMLDialogElement> | undefined> = viewChild('dialog')
    protected playing: WritableSignal<boolean> = signal(false)

    protected embedUrl: Signal<SafeResourceUrl | undefined> = computed(() => {
        const { site, key } = this.params()
        const base = EMBED_BASE[site]
        if (base === undefined || key === "") return undefined
        return this.sanitizer.bypassSecurityTrustResourceUrl(`${base}${encodeURIComponent(key)}?autoplay=1`)
    })

    protected thumbnailUrl: Signal<string | undefined> = computed(() => {
        const { site, key } = this.params()
        if (site !== "youtube") return undefined
        // mqdefault is a true 16/9 frame; hqdefault is 4/3 and arrives letterboxed.
        return `https://i.ytimg.com/vi/${encodeURIComponent(key)}/mqdefault.jpg`
    })

    protected open(): void {
        this.playing.set(true)
        this.dialog()?.nativeElement.showModal()
    }

    protected close(): void {
        this.dialog()?.nativeElement.close()
    }

    // Escape and the close button both end up here. Dropping the flag destroys the
    // iframe, which is what actually stops the video from playing on in the background.
    protected onClose(): void {
        this.playing.set(false)
    }

    protected onDialogClick(event: MouseEvent): void {
        if (event.target === this.dialog()?.nativeElement) this.close()
    }
}

export interface ExternalVideoPlayerParams {
    site: string
    key: string
    name: string
    type: string
}
