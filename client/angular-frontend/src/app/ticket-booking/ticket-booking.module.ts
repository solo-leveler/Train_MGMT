import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,    
    ReactiveFormsModule
  ],
  declarations: [BookTicketComponent],
  exports: [BookTicketComponent]
})
export class TicketBookingModule { }