import { Component, inject, Signal } from '@angular/core';
import { DetailedPeopleService } from '../../shared/services/detailed-people.service';
import DetailedPeople from '../../shared/models/interfaces/detailed-people';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';
import { environment } from '../../../environments/environment.development';
import { ImageService } from '../../shared/services/image.service';
import { CardComponent, CardParams } from '../../shared/components/card/card.component';
import Metadata from '../../shared/models/interfaces/meta-data.interface';

@Component({
    selector: 'app-detailed-people',
    imports: [RouterOutlet],
    templateUrl: './detailed-people.component.html',
    styleUrl: './detailed-people.component.css'
})
export class DetailedPeopleComponent {
    constructor() {}

}


