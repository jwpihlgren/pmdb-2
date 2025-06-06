import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppEventService } from './shared/services/app-event.service';
import { ScrollToTopOnDirective } from './shared/directives/scroll-to-top-on.directive';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, ScrollToTopOnDirective, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'pmdb-2';

    appEventService: AppEventService = inject(AppEventService)
}
