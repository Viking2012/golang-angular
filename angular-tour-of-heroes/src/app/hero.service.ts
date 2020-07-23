import { Injectable } from '@angular/core';
import { Hero } from "./heros/hero";
import { HEROS } from "./mocks/heros";
import { MessageService } from "./message.service";

import { Observable, of } from "rxjs";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
  
  getHeros(): Observable<Hero[]> {
    // TODO(ajo): send the message _after_ fetching the heros
    this.messageService.add('HeroService: fetched heros')
    return of(HEROS);
  }
}
