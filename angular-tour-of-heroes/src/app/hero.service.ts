import { Injectable } from '@angular/core';
import { Hero } from "./heros/hero";
import { HEROS } from "./mocks/heros";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  
  getHeros(): Hero[] {
    return HEROS;
  }
}
