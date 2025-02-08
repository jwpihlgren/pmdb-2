import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {

    transform(value: string, maxCharacters: number): unknown {
        if(value.length <= maxCharacters) return value
        return value.substring(0, maxCharacters - 3) + "...";
    }

}
