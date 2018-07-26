import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroesURL = 'https://herosapp-99bb3.firebaseio.com/heroes.json';
  private heroeURL = 'https://herosapp-99bb3.firebaseio.com/heroes';

  constructor(private http: HttpClient) { }

  public nuevoHeroe( heroe: Heroe ) {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.heroesURL, body, {headers})
                .pipe(map( (res: any) => {
                  console.log(res);
                  return res;
                }));
  }

  public actualizarHeroe( heroe: Heroe, key$: string ) {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.heroeURL}/${ key$ }.json`;

    return this.http.put( url, body, {headers})
                .pipe(map( (res: any) => {
                  console.log(res);
                  return res;
                }));
  }

  public getHeroe(key$: string) {
    const url = `${this.heroeURL}/${key$}.json`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  public getHeroes() {
    const url = this.heroesURL;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  public borrarHeroe(key$: string) {
    const url = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(url).pipe(map(res => res));
  }
}
