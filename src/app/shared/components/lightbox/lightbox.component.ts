import { Component, input, InputSignal, OnChanges, output, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ImageComponent, ImageParams } from '../image/image.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-lightbox',
    imports: [ImageComponent, NgClass],
    templateUrl: './lightbox.component.html',
    styleUrl: './lightbox.component.css',
    host: {
        '[style.display]': 'visible() !== undefined ? "initial" : "none"'
    }

})
export class LightboxComponent implements OnChanges {
    params: InputSignal<LightboxParams> = input.required()
    visible: InputSignal<number | undefined> = input.required()
    closeRequest = output<boolean>()
    protected activeIndex: WritableSignal<number | undefined> = signal(0)

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["visible"]) {
            this.activeIndex.set(this.visible())
        }
    }

    close(_: Event) {
        this.closeRequest.emit(true)
    }

    previous(event: Event): void {
        event.preventDefault()
        const index = this.activeIndex()
        if (index === undefined) return
        if (index - 1 < 0) {
            this.activeIndex.set(this.params().images.length - 1)
        }
        else this.activeIndex.set(index - 1)

    }
    next(event: Event) {
        event.preventDefault()
        const index = this.activeIndex()
        if (index === undefined) return
        if (index + 1 >= this.params().images.length) {
            this.activeIndex.set(0)
        }
        else this.activeIndex.set(index + 1)
    }
}


export interface LightboxParams {
    images: ImageParams[],
}
