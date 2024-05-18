import { Component, Input, OnInit } from '@angular/core';
import { ICity } from '../../model/icity';
import { Router } from '@angular/router';
import { IOrders } from '../../model/iorders';
import { OrderService } from '../order.service';
import { ShowStatuses } from './showStatus.enum';
import { showCityList } from './showCityList.enum';
import { IpService } from '../ip.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'] // Zmiana z `styleUrl` na `styleUrls`
})
export class OrdersComponent {
ShowStatuses: any;
ShowCityList: any;

  takeOrder(order: IOrders) {
    if (order.statusName.statusesName === 'accepted') {
      const newStatus = 'waiting';
      this.orderService.acceptOrder(order.id, newStatus).subscribe((success: boolean) => {
        if (success) {
          order.statusName.statusesName = newStatus;
          console.log(`Order status successfully changed to ${newStatus}`);
        } else {
          console.error('Failed to change order status');
        }
      }, (error: any) => {
        console.error('Error occurred while changing order status:', error);
      });
    }
  
  }
  
  
  
  

  @Input() listofcities: ICity[] = []; //z bazy danych 
  @Input() listoforders: IOrders[] =[]; 

  @Input() showedOrders: number = 10;  // customizacja liczby wyświetlanych zleceń
  @Input() showStatus: ShowStatuses =  ShowStatuses.all; // customizacja wyświetlania statusu zlecenia
  @Input() showCityList: showCityList = showCityList.lessOption; // customizacja wyświetlania listy miast

  displayedOrders: any[] = [];


  constructor(private router: Router,  private orderService: OrderService, private ip: IpService) {

  }
  ngOnInit(): void {
console.log(this.listofcities);
    console.log(this.listoforders);
    this.getOrders().then(orders => this.listoforders = orders);
    this.displayedOrders = this.listoforders.slice(0, this.showedOrders);
  }

  showMore() {
    this.showedOrders += 10; // Możesz zmienić tę wartość na dowolną
    this.displayedOrders = this.listoforders.slice(0, this.showedOrders);
    
  }

  shouldDisplayOrder(order: any): boolean {
    switch (this.showStatus) {
      case ShowStatuses.all:
        return true;
      case ShowStatuses.waiting:
        return order.statusName === 'waiting';
      case ShowStatuses.rejected:
        return order.statusName === 'rejected';
      default:
        return false;
    }
  }

  filterOrdersByCity(event: any): void {
    const cityName = event.target.value;
    if (cityName === 'showAll') {
      this.displayedOrders = this.listoforders.slice(0, this.showedOrders);
    } else {
      this.displayedOrders = this.listoforders.filter(order => order.cityName === cityName);
    }
  }
  

  async getOrders(): Promise<IOrders[]> {
    try {
      const response = await fetch('http://'+this.ip.Ip+':8080/api/order/getAllOrders');
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
