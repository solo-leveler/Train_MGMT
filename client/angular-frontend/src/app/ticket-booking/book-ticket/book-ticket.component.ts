import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mockResponse } from './booking-system-response';
import { BookTicketResponseModel, TrainSeatInfoModel } from '../models/book-ticket.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';

//import {TrainTicketMockService} from '../services/bus-ticket-service';

@Component({
  selector: 'book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
  providers : [BookTicketResponseModel],
  encapsulation: ViewEncapsulation.None
})
export class BookTicketComponent implements OnInit {
  //public bookingInfo!: BookTicketResponseModel;
  public bookingForm!: FormGroup;
  public displaydata:any;
  public availablseats: TrainSeatInfoModel[] = [];
  public flag: boolean = true;
  public error!: string;
  public res: any; 

  constructor(private fb: FormBuilder,private httpClient : HttpClient,public bookingInfo : BookTicketResponseModel) {
    this.initateForm();
    //this.getTickets();
  }
  async getTickets(){
    try {
      const response =  await axios.get('/api/tickets/getTrainTickets')
      if(response.data.length)
      {
        this.bookingInfo.seats = response.data
        //this.copybookingInfo.seats = JSON.parse(JSON.stringify(this.bookingInfo.seats))
        console.log(response)
        this.availablseats = this.getAvailablseats();
      }
      else 
      console.log(response)
    } catch (error) {
      
    }
  }
  async bookTrainTickets() {
    try {
      const response = await axios.post('/api/tickets/bookTrainTickets', this.displaydata.selected);
      if (response.data.success) {
        console.log(response.data.data); // Updated tickets
        window.alert("Booked Successfully")
      } else {
        console.log(response.data.message); // Error message
      }
    } catch (error) {
      console.error('Error booking train tickets:', error);
    }
  }
  
  async clearBooking() {
    try {
      const response = await axios.post('/api/tickets/clearBooking');
      if (response.data.success) {
        console.log(response.data.message); // Success message
      } else {
        console.log(response.data.message); // Error message
      }
    } catch (error) {
      console.error('Error updating tickets:', error);
    }
  }

  public ngOnInit(): void {
    //this.bookingInfo = mockResponse;
    this.getTickets()
    this.availablseats = this.getAvailablseats();
  }
  //Validation to check if user will try to book the seats greater then 7
  public onSubmit(formValues: FormGroup): void {
    const userName: string = formValues.controls['name'].value;
    const requiredSeats: number = parseInt(formValues.controls['count'].value);
    if (requiredSeats > 7) {
      this.error = "Please enter seat number less then 8";
    } else if (requiredSeats > 0) {
      this.checkInCategorys(userName, requiredSeats);
    }

  }

  public openBookingForm(): void {
  this.bookingForm.setValue({
    name: '',
    count: ''
  });
  this.flag = true;
  this.error = '';
  this.getTickets();
}
//This code checks the seats availability and return the available seats list 
  private getAvailablseats(): TrainSeatInfoModel[] {
    let availablseats: TrainSeatInfoModel[] = []
    this.bookingInfo.seats.forEach(seat => {
      if (seat.status === 'available') {
        availablseats.push(seat);
      }
    });
    this.showDisplayData();
    return availablseats;
  }

//This code will show the display data
  private showDisplayData(){
    this.displaydata = this.bookingInfo.seats.reduce((acc:Record<string, any>,cv) => {
      if(cv['status']) (acc[cv['status']] ||= []).push(cv);
      return acc;
    },{})
    // const selectedSeatCount = this.displaydata.booked.reduce((count: number, seat: { bookedBy: any; }) => {
    //   if (seat.bookedBy === this.bookingForm.controls['name'].value) {
    //     return count + 1;
    //   }
    //   return count;
    // }, 0);
    //this.displaydata.selected  = selectedSeatCount
    console.log(this.displaydata)    
  } 
//This code will booked the seats in row priority
  private checkInCategorys(name: string, count: number): void {
    let category2: TrainSeatInfoModel[] = [];
    let category3: TrainSeatInfoModel[] = [];
    let random: TrainSeatInfoModel[] = [];
    if (count === 1) {
      category2 = this.checkInCategory(count, 2);
      if (category2.length !== 0) {
        this.bookSeat(category2, name);
      } else {
        category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        }
      }
    } else if (count === 2) {
      category2 = this.checkInCategory(count, 2);
      if (category2.length !== 0) {
        this.bookSeat(category2, name);
      } else {
        category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        } else {
          this.bookSeat(this.getRandomSeats(count), name);
        }

      }
    } else if(count === 3){
      category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        } else {
          this.bookSeat(this.getRandomSeats(count), name);
        }
    } else {
        this.bookSeat(this.getRandomSeats(count), name);
    }

  }

  private bookSeat(bookseats: TrainSeatInfoModel[], name: string): void {
    bookseats.forEach(seat => {
      const index: number = this.bookingInfo.seats.findIndex(data => data.seatNo === seat.seatNo);
      this.bookingInfo.seats[index].status = "selected";
      this.bookingInfo.seats[index].bookedBy = name;
    });

    this.availablseats = this.getAvailablseats();

    this.flag = false;
  }

  private checkInCategory(count: number, category: number): TrainSeatInfoModel[] {
    let bookseats: TrainSeatInfoModel[] = [];
    this.availablseats.forEach(seat => {
      if (bookseats.length < count) {
        if (seat.category === category) {
          bookseats.push(seat);
        }
        if (bookseats.length === count && count > 1) {
          bookseats = this.chekIfSameRow(bookseats);
        }
      }

    });
    if (bookseats.length === count) {
      return bookseats;
    } else {
      return [];
    }
  }
//This code will check the user will be given the seats in same row
  private chekIfSameRow(bookseats: TrainSeatInfoModel[]): TrainSeatInfoModel[] {
    let row: number[] = [];
    bookseats.forEach(seat => {
      row.push(seat.row);
    })
    if (Array.from(new Set(row)).length === 1) {
      return bookseats;
    } else {
      const removeIndex = bookseats.splice(-1, 1);

      return removeIndex;
    }
  }

  private getRandomSeats(count: number): TrainSeatInfoModel[] {
    let randomSeats: TrainSeatInfoModel[] = [];
    this.availablseats.forEach(seat => {
      if (randomSeats.length < count) {
        randomSeats.push(seat)
      }
    });
    return randomSeats;
  }

  private initateForm(): void {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.pattern('^[a-zA-Z \-\']+'),Validators.required]],
      count: ['', Validators.required]
    });
  }

}
