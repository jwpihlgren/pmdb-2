import { Component, inject } from '@angular/core';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { AppEventService } from '../../../../shared/services/app-event.service';

@Component({
  selector: 'app-discover-shows',
  imports: [CardLoadingComponent, CardGridComponent],
  templateUrl: './discover-shows.component.html',
  styleUrl: './discover-shows.component.css'
})
export class DiscoverShowsComponent {
    protected appEventService: AppEventService = inject(AppEventService)


    paginate() {
        this.appEventService.emitEvent({type: "PAGINATION", data: {}})
    }
}
