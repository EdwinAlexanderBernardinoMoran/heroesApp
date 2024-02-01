import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

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

  onSubmit():void {
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
