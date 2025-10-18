import { Component, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
    selector: 'app-text-input',
    imports: [ReactiveFormsModule],
    templateUrl: './text-input.component.html',
    styleUrl: './text-input.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: TextInputComponent
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor {

    elementRef = inject(ElementRef)

    searchForm = new FormControl('')
    value = toSignal(this.searchForm.valueChanges.pipe(tap(c => this.onChange(c))))

    onChange: (value: string | null) => void = () => { }
    onTouched: any = () => { }


    writeValue(value: string | null): void {
        this.searchForm.setValue(value)
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }
}
