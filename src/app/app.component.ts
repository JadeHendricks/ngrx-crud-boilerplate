import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private toastr = inject(ToastrService);

  public showToastr(): void {
    this.toastr.success('This is a success message!', 'Success');
  }
}
