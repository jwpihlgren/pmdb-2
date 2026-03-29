import { Component, inject, } from '@angular/core';
import { ConfigService } from '../../../../shared/services/config.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';
import { ComboboxComponent } from '../../../../shared/components/combobox/combobox.component';
import { ChipListComponent } from '../../../../shared/components/chip-list/chip-list.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { RoutingService } from '../../../../shared/services/routing.service';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { AppEventService } from '../../../../shared/services/app-event.service';
import { KeywordService } from '../../../../shared/services/keyword.service';
import { DropdownListComponent } from '../../../../shared/components/drop-down-list/dropdown-list.component';
import { ComboboxItemComponent } from '../../../../shared/components/combobox/components/combobox-item.component';
import { ExpandableMultiSelectComponent } from '../../../../shared/components/expandable-multi-select/expandable-multi-select.component';
import { SelectItemComponent } from '../../../../shared/components/expandable-multi-select/components/select-item/select-item.component';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { SimpleGridComponent } from '../../../../shared/components/simple-grid/simple-grid.component';
import { DISCOVER_SOURCE, DiscoverStateService, QUERY_FACTORY } from '@app/discover';
import { MovieDiscoverQuery, MovieDiscoverQueryFactory } from '../../discover/movie-discover-query';
import { MoviesService } from '../../movies.service';
import PaginatedResult from '@app/shared/models/types/paginated-result.type';
import { ResultMovie } from '@app/shared/models/interfaces/result-movie';

@Component({
    selector: 'app-discover-movies',
    imports: [ReactiveFormsModule, CardComponent, ContentMovieComponent, ComboboxComponent, ChipListComponent,
        ChipComponent, PaginationComponent, CardLoadingComponent, DropdownListComponent, ComboboxItemComponent,
        ExpandableMultiSelectComponent, SelectItemComponent, TextInputComponent, SimpleGridComponent],
    templateUrl: './discover-movies.component.html',
    styleUrl: './discover-movies.component.css',
    providers: [
        DiscoverStateService,
        {
            provide: QUERY_FACTORY,
            useValue: MovieDiscoverQueryFactory
        },
        {
            provide: DISCOVER_SOURCE,
            useFactory: (svc: MoviesService) => (query: MovieDiscoverQuery) => svc.discover(query),
            deps: [MoviesService]
        }
    ]

})
export class DiscoverMoviesComponent {

    protected configService: ConfigService = inject(ConfigService)
    protected routingService: RoutingService = inject(RoutingService)
    protected appEventService: AppEventService = inject(AppEventService)
    protected keywordService: KeywordService = inject(KeywordService)
    protected state = inject<DiscoverStateService<MovieDiscoverQuery, PaginatedResult<ResultMovie>>>(DiscoverStateService)
    genres!: Genre[]

    cardMaxWidth = "250px"



}
