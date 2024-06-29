import { Component } from '@angular/core';
import { TourListComponent } from "../add-tours/add-tours.component";
import { HotelListComponent } from "../add-hotels/add-hotels.component";
import { AppComponent } from '../app.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [TourListComponent, HotelListComponent, AppComponent, RouterModule]
})
export class HomeComponent {
    
  }