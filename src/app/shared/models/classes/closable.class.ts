export abstract class Closable {
    private _open: boolean = false
    get open() {
        return this._open
    }

    set open(value: boolean) {
        this._open = value
    }

    onToggle(event: Event): void {
        const target = event.target as HTMLElement
        const currentTarget = event.currentTarget as HTMLElement
        if (target.tagName === currentTarget.tagName) {
            this.open = !this.open
        }
    }

    handleKeyUp(event: KeyboardEvent): void {
        if (event.code === "Escape") {
            this.open = false
        }
    }

    handleClickOutside(event: Event): void {
        this.open = false
    }

    handleFocusLost(event: Event): void {
        this.open = false
    }
}
