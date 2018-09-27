import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent  {

  heroe: Heroe = {
    nombre: '',
    casa: 'Marvel',
    bio: ''
  };

  nuevo = false;
  id: string;

  constructor(private _heoresService: HeroesService, private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe( parametros => {
      this.id = parametros['id'];
      if (this.id !== 'nuevo') {
        this._heoresService.getHeroe(this.id).subscribe( heroe => this.heroe = heroe );
      }
    });
  }

  public guardar() {
    if (this.id === 'nuevo') {
      this._heoresService.nuevoHeroe(this.heroe).subscribe( data => {
        this.router.navigate(['/heroe', data.name]);
      }, error => console.error(error));
    } else {
      this._heoresService.actualizarHeroe(this.heroe, this.id)
            .subscribe( data => {
            });
    }
  }

  public agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      'casa': 'Marvel'
    });
  }
}
