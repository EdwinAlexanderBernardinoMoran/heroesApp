import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: 'Dc - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  get currentHero(): Hero {
    // Trata este form como un heroe
    const hero = this.heroForm.value as Hero
    return hero;
  }

  onSubmit():void {

    if (this.heroForm.invalid) return;
    if (this.currentHero.id ) {

      this.heroService.updateHero(this.currentHero).subscribe(
        hero => {
          // TODO: mostrar snackbar
        }
      );
      return
    }

    this.heroService.addHero(this.currentHero).subscribe(hero => {
      // TODO: mostrat nackbar, y navegar a /heroes/edit/hero.id
    })

    // this.heroService.updateHero(this.heroForm.value); no es valido ya que no cumple con la interfaz, se soluciona creando un get
    console.log({
      formIsValid: this.heroForm.valid,

      // Regresa todos los valores sin importar si estan habilitados
      // value: this.heroForm.getRawValue()

      // Regresa todos los valores del formulario
      value: this.heroForm.value
    }
    );
  }

}
