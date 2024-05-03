import { Component, Input, OnInit } from '@angular/core';
import { ICity } from '../../model/icity';
import { Router } from '@angular/router';
import { IOrders } from '../../model/iorders';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'] // Zmiana z `styleUrl` na `styleUrls`
})
export class OrdersComponent {
  
  takeOrder(order: IOrders) {
    this.orderService.changeOrderStatus(order.id, 'accepted').subscribe(success => {
      if (success) {
        order.statusName.statusesName = 'accepted';
        console.log('Order status successfully changed to accepted');
      } else {
        console.error('Failed to change order status');
      }
    }, error => {
      console.error('Error occurred while changing order status:', error);
    });
  }
  

  @Input() listofcities: ICity[] = []; //z bazy danych 
  @Input() listoforders: IOrders[] =[]; 

  constructor(private router: Router,  private orderService: OrderService) {
    
  }
  ngOnInit(): void {
const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { orders: IOrders[] };
    if (state) {
      this.listoforders = state.orders;
    }
    
    console.log(this.listoforders);
    this.getOrders().then(orders => this.listoforders = orders);
    
  }

  async getOrders(): Promise<IOrders[]> {
    try {
      const response = await fetch('http://localhost:8080/api/order/getAllOrders');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: any[] = await response.json();
      return data.map((order) => {
        const newOrder: IOrders = {
          id: order.id,
          cityName: order.cityName,
          statusName: {
            statusesName: order.statusName,
          },
          idOrdermaker: {
            id: order.idOrdermaker.id,
            username: order.idOrdermaker.username,
            password: order.idOrdermaker.password,
            currency: order.idOrdermaker.currency,
          },
          idOrdertaker: order.idOrdertaker ? {
            id: order.idOrdertaker.id,
            username: order.idOrdertaker.username,
            password: order.idOrdertaker.password,
            currency: order.idOrdertaker.currency,
          } : null,
          orderTypeName: {
            ordertypeName: order.orderTypeName,
          },
          duration: order.duration,
          value: order.value,
          isActive: order.isActive,
        };
        return newOrder as IOrders;
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  }
  

  selectOrder(order: any) {
    alert(`Wybrałeś zlecenie: Typ zlecenia: ${order.orderTypeName.ordertypeName}, Miejscowość: ${order.cityName}`);
    alert(`Zmieniono Stasus na:  ${order.statusName.statusesName}`);
  }
}
