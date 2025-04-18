import { ResolveFn } from '@angular/router';
import DetailedPeople from '../models/interfaces/detailed-people';
import { inject } from '@angular/core';
import { DetailedPeopleService } from '../services/detailed-people.service';

export const detailedPeopleResolver: ResolveFn<DetailedPeople> = (route, state) => {
    const service: DetailedPeopleService = inject(DetailedPeopleService)
    const id = route.params["id"]
    return service.get(id)
};
