import { Component, OnInit } from '@angular/core';
import { mockResponse } from './booking-system-response';
import { BookTicketResponseModel, TrainSeatInfoModel } from '../models/book-ticket.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment/eniroment';

//import {TrainTicketMockService} from '../services/bus-ticket-service';

@Component({
  selector: 'book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
  providers : [BookTicketResponseModel]
})
export class BookTicketComponent implements OnInit {
  //public bookingInfo!: BookTicketResponseModel;
  public bookingForm!: FormGroup;
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
      const response =  await axios.get(environment.apiUrl+ '/api/tickets/getTrainTickets')
      if(response.data.length)
      {
        this.bookingInfo.seats = response.data
        console.log(response)
        this.availablseats = this.getAvailablseats();
      }
      else 
      console.log(response)
    } catch (error) {
      
    }
  }
 
  public ngOnInit(): void {
    this.getTickets();
    //this.bookingInfo = mockResponse;
    //this.availablseats = this.getAvailablseats();
    //let busTicketMockService = new TrainTicketMockService();
    //this.res = busTicketMockService.get();
  }

  public onSubmit(formValues: FormGroup): void {
    const userName: string = formValues.controls['name'].value;
    const requiredSeats: number = parseInt(formValues.controls['count'].value);
    if (requiredSeats > this.availablseats.length) {
      this.error = "required seats not available";
    } 
    else 
    this.flag =false
  }

  public openBookingForm(): void {
  this.bookingForm.setValue({
    name: '',
    count: ''
  });
  this.flag = true;
  this.error = '';
}

  private getAvailablseats(): TrainSeatInfoModel[] {
    let availablseats: TrainSeatInfoModel[] = []
    this.bookingInfo.seats.forEach(seat => {
      if (seat.status === 'available') {
        availablseats.push(seat);
      }
    });
    return availablseats;
  }

  

  public bookSeat(bookseats: TrainSeatInfoModel): void {
    
      const index: number = this.bookingInfo.seats.findIndex(data => data.seatNo === bookseats.seatNo);
      if (this.bookingInfo.seats[index].status != "available")      
        this.bookingInfo.seats[index].status = "available";
      else
      this.bookingInfo.seats[index].status = "selected";
    

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
      name: [''],
      count: ['', Validators.required]
    });
  }

}
