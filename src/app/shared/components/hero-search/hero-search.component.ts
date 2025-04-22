import { Component, output } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  imports: [],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
    search = output<string>()
    clear = output<Event>()
    
    searchRequest(event: any): void {
        this.search.emit(event.target.value)
    }

    clearRequest(event: Event) {
        event.preventDefault()
        this.clear.emit(event)
    }
}
