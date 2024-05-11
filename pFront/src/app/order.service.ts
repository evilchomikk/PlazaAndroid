import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://192.168.1.13:8080'; // replace with your backend base URL

  constructor(private http: HttpClient) { }

  acceptOrder(orderId: number, newStatus: string): Observable<boolean> {
    return this.http.post<void>(`${this.baseUrl}/api/order/acceptOrder/${orderId}`, { status: newStatus }, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => {
        return response.status === 200;
      }));
  }
}
export interface IOrders {
  id: number;
  statusName: {
    statusesName: string;
  };
}