import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule, 
    MatTooltipModule,  
    MatChipsModule,
    MatSnackBarModule, 
    ReactiveFormsModule
  ],
  declarations: [BookTicketComponent],
  exports: [BookTicketComponent]
})
export class TicketBookingModule { }