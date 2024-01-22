import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if (!hero.id && !hero.alter_image) {
      return 'assets/no-image.jpg';
    }

    if (hero.alter_image) return hero.alter_image

    return `assets/heroes/${hero.id}.jpg`;
  }

}
