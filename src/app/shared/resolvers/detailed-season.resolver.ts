import { ResolveFn } from '@angular/router';
import { DetailedSeason } from '../models/interfaces/detailed-season';
import { inject } from '@angular/core';
import { DetailedShowService } from '../services/detailed-show.service';
import { EMPTY } from 'rxjs';

export const detailedSeasonResolver: ResolveFn<DetailedSeason> = (route, state) => {
    const service: DetailedShowService = inject(DetailedShowService)
    const showId = parseInt(route.parent?.paramMap.get("id") ?? "")
    const seasonId = parseInt(route.paramMap.get("seasonId") ?? "")

    if([showId, seasonId].some(id => isNaN(id))) return EMPTY
    
    return service.seasonById(+showId, seasonId)
};
