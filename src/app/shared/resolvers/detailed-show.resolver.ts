import { ResolveFn } from '@angular/router';
import { DetailedShow } from '../models/interfaces/detailed-show';
import { inject } from '@angular/core';
import { DetailedShowService } from '../services/detailed-show.service';

export const detailedShowResolver: ResolveFn<DetailedShow> = (route, state) => {
    const service: DetailedShowService = inject(DetailedShowService)

    const id = route.params["id"]
    return service.get(id)
};
