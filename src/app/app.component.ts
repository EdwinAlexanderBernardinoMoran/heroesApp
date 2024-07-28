import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Heroes App';

  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.authService.checkAuthentication().subscribe(
      () => {
        console.log('checkauthentication finished');
      }
    )
  }
}
