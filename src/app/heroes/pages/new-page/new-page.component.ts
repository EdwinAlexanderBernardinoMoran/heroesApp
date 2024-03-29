import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ){}

  get currentHero(): Hero {
    // Trata este form como un heroe
    const hero = this.heroForm.value as Hero
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return

    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroService.getHeroById(id)),
    ).subscribe( hero => {
      if (!hero) return this.router.navigateByUrl('/');
      console.log(hero);

      this.heroForm.reset(hero);
      return
    })
  }

  onSubmit():void {

    if (this.heroForm.invalid) return;
    if (this.currentHero.id ) {

      this.heroService.updateHero(this.currentHero).subscribe(
        hero => {
          // TODO: mostrar snackbar
          this.showSnackbar(`${ hero.superhero } updated!`);
        }
      );
      return
    }

    this.heroService.addHero(this.currentHero).subscribe(hero => {
      // TODO: mostrat nackbar, y navegar a /heroes/edit/hero.id
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${ hero.superhero } created!`);
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

  onDelete(){
    if (!this.currentHero.id) throw Error('Hero id is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().pipe(
      filter((result: boolean) => result),
      // tap(result => console.log({result})
      // )
      switchMap( () => this.heroService.deleteHero(this.currentHero.id)),
      filter((wasDeleted: boolean) => wasDeleted)
      // tap(wasDelete => console.log({wasDelete})
      // )
    ).subscribe(result => {
      this.router.navigate(['/heroes']);
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return
    //   console.log('deleted');
    //   this.heroService.deleteHero(this.currentHero.id).subscribe(
    //     wasDelete => {
    //       if (wasDelete)
    //       this.router.navigate(['/heroes']);
    //     }
    //   );
    // });
  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'done', {
      duration: 2500
    })
  }

}
