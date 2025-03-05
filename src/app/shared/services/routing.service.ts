import { Injectable } from '@angular/core';
import MediaType from '../models/types/media.type';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }
    
    private stubs = {
        movie: "movies",
        show: "shows",
        person: "people"
    }

    getStubByMediaType(type: MediaType): string{
        return this.stubs[type]
    }
}
