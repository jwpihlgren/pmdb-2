import { Component, ElementRef, HostListener, inject, input, InputSignal, OnInit, Signal, viewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-external-video-player',
    imports: [],
    templateUrl: './external-video-player.component.html',
    styleUrl: './external-video-player.component.css',
})
export class ExternalVideoPlayerComponent implements OnInit {
    sanitizer: DomSanitizer = inject(DomSanitizer)
    params: InputSignal<ExternalVideoPlayerParams> = input.required()

    youtubeApi = "https://www.youtube.com/embed/"
    vimeoApi = "https://player.vimeo.com/video/"
    youtubeUrl!: SafeResourceUrl
    vimeoUrl!: SafeResourceUrl

    dialog: Signal<ElementRef<HTMLDialogElement>> = viewChild.required('dialog')
    
    @HostListener('click') 
    onClick(btn: any) {
        console.log(btn)
    }
    ngOnInit() {
        this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.youtubeApi}${this.params().key}`) ?? ""
        this.vimeoUrl = this.sanitizer.bypassSecurityTrustResourceUrl( `${this.vimeoApi}${this.params().key}`) ?? ""
    }


    closeDialog(event: Event): void {
        console.log(this.dialog().nativeElement)
        this.dialog().nativeElement.close('cancle')
    }

    openDialog(event: Event): void {
        console.log(this.dialog().nativeElement)
        event.preventDefault()
        this.dialog().nativeElement.showModal()
    }
}

export interface ExternalVideoPlayerParams {
    type: string
    title: string
    key: string
}
