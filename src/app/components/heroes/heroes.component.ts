import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent {

  public heroes: Heroe [];

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes().subscribe( heroes => {
      this.heroes = heroes;
    });
  }

  public borrarHeroe(key$: string) {
    this._heroesService.borrarHeroe(key$).subscribe(res => {
      if (res) {
        console.error(res);
      } else {
        delete this.heroes[key$];
      }
    });
  }

}
