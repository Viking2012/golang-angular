import { Injectable } from '@angular/core';
import { Hero } from "./heros/hero";
import { HEROS } from "./mocks/heros";

import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  
  getHeros(): Observable<Hero[]> {
    return of(HEROS);
  }
}
