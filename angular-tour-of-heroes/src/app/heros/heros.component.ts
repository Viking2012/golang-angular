import { Component, OnInit } from '@angular/core';
import { Hero } from "./hero";
import { HEROS } from "../mocks/heros";

import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heros: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeros();
  }

  onSelect(hero: Hero): void {
    if (hero === this.selectedHero) {
      this.selectedHero = null;
    } else {
      this.selectedHero = hero;
    }
  }

  getHeros(): void {
    this.heros = this.heroService.getHeros();
  }

}
