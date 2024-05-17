import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  constructor(private http: HttpClient, private ip:IpService) { }

  acceptOrder(orderId: number, newStatus: string): Observable<boolean> {
    return this.http.post<void>('https://'+this.ip.Ip+`:8080/api/order/acceptOrder/${orderId}`, { status: newStatus }, { observe: 'response' })
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