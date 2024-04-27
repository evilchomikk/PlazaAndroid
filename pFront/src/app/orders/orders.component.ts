import { Component, Input } from '@angular/core';
import { ICity } from '../../model/icity';
import { Router } from '@angular/router';
import { IOrders } from '../../model/iorders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'] // Zmiana z `styleUrl` na `styleUrls`
})
export class OrdersComponent {
giveOrder(_order: IOrders) {
throw new Error('Method not implemented.');
}
takeOrder(_order: IOrders) {
throw new Error('Method not implemented.');
}

  @Input() listofcities: ICity[] = []; //z bazy danych 
  @Input() listoforders: IOrders[] =[]; 

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { orders: IOrders[] };
    if (state) {
      this.listoforders = state.orders;
    }
  }
  

  selectOrder(order: any) {
    alert(`Wybrałeś zlecenie: Typ zlecenia: ${order.type}, Miejscowość: ${order.city}`);
  }
}
