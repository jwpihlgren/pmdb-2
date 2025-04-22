import { Component, forwardRef, output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-hero-search',
    imports: [ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => HeroSearchComponent)
        }
    ],
    templateUrl: './hero-search.component.html',
    styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements ControlValueAccessor {
    search = output<string>()
    clear = output<Event>()
    focus = output<FocusEvent>()
    blur = output<FocusEvent>()

    searchInput: FormControl<string> = new FormControl<string>('', {nonNullable: true})

    searchRequest(event: any): void {
        this.search.emit(event.target.value)
    }

    clearRequest(event: Event) {
        event.preventDefault()
        this.searchInput.reset()
        this.clear.emit(event)
    }

    focusRequest(event: FocusEvent): void {
        this.focus.emit(event)
    }

    blurRequest(event: FocusEvent): void {
        this.blur.emit(event)
    }

    writeValue(value: string): void {
        this.searchInput.setValue(value)
    }

    registerOnChange(fn: any): void {
        this.searchInput.valueChanges.subscribe(fn)
    }

    registerOnTouched(fn: any): void {
        this.searchInput.valueChanges.subscribe(fn)
    }
}

