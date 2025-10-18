import { afterNextRender, AfterViewInit, Component, DestroyRef, ElementRef, inject, input, signal, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-dropdown-list',
    encapsulation: ViewEncapsulation.None,
    imports: [],
    templateUrl: './dropdown-list.component.html',
    styleUrl: './dropdown-list.component.css',
    host: {
        '[class.open-up]': 'openUp()',
        '[class.open-down]': '!openUp()',
        '[class.open-right]': '!openLeft()',
        '[class.open-left]': 'openLeft()',
        '[style.top.px]': 'topPosition()',
        '[style.left.px]': 'leftPosition()',
        '[style.max-height.px]': 'maxHeight()',
        '[style.position]': '"fixed"',
        '(window:scroll)': 'calculatePosition()',
        '(window:resize)': 'calculatePosition()'
    }
})
export class DropdownListComponent {

    triggerElement = input.required<ElementRef | HTMLElement>()
    private destroyRef = inject(DestroyRef)

    openUp = signal(false)
    openLeft = signal(false)
    topPosition = signal(0)
    leftPosition = signal(0)
    maxHeight = signal(400)

    private readonly HEADER_HEIGHT = 80
    private readonly SAFE_DISTANCE = 20

    constructor() {
        afterNextRender(() => {
            this.calculatePosition()
            this.setupScrollListener()
        })
    }

    private setupScrollListener() {
        const scrollHandler = () => this.calculatePosition();

        document.addEventListener('scroll', scrollHandler, true);

        this.destroyRef.onDestroy(() => {
            document.removeEventListener('scroll', scrollHandler, true);
        });
    }

    calculatePosition() {
        const trigger = this.triggerElement()
        const triggerEl: HTMLElement = trigger instanceof ElementRef ? trigger.nativeElement : trigger
        const triggerRect = triggerEl.getBoundingClientRect()

        const spaceBelow = window.innerHeight - triggerRect.bottom - this.SAFE_DISTANCE
        const spaceAbove = triggerRect.top - this.SAFE_DISTANCE - this.HEADER_HEIGHT

        const spaceLeft = triggerRect.left - this.SAFE_DISTANCE
        const spaceRight = window.innerWidth - triggerRect.right - this.SAFE_DISTANCE

        this.openUp.set(spaceAbove > spaceBelow)
        this.openLeft.set(spaceLeft > spaceRight)
        this.maxHeight.set(this.openUp() ? spaceAbove : spaceBelow)
        this.topPosition.set(this.openUp() ? triggerRect.top : triggerRect.bottom)
        this.leftPosition.set(this.openLeft() ? triggerRect.right - triggerRect.width : triggerRect.left)
    }
}
