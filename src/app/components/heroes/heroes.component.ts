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
  public loading = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes().subscribe( heroes => {
      setTimeout(() => {
        this.heroes = heroes;
        this.loading = false;
      }, 1500);
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

  public enviarPeticion() {
    this._heroesService.pruebaHan().subscribe( res => {
      console.log(res);
    });
  }

}
