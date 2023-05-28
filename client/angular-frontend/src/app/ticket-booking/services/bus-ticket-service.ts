import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainSeatInfoModel } from '../models/book-ticket.model';

const baseUrl = 'http://localhost:8080/api/tickets';

@Injectable()
export class BusTicketService {
    readonly baseURL = 'http://localhost:3000/tickets';
constructor(private http: HttpClient){}

    // public get(): Observable<HttpResponse<any>> {
    //  return this.http.get<any>(
    // '/get/seats', {headers: null}
    // );

    // }
    getAll(): Observable<TrainSeatInfoModel[]> {
        return this.http.get<TrainSeatInfoModel[]>(`${baseUrl}/bookTicket`);
    }
    getEmployeeList() {
        return this.http.get(this.baseURL + 'getTrainTickets');
    }
}
