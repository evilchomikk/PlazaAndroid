import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'] // Zmiana z `styleUrl` na `styleUrls`
})
export class OrdersComponent {
  orders: any[];

  constructor() {
    this.orders = [
      { type: 'Typ1', city: 'Miasto1', user: 'Użytkownik1' },
      { type: 'Typ2', city: 'Miasto2', user: 'Użytkownik2' },
      { type: 'Typ3', city: 'Miasto3', user: 'Użytkownik3' }
    ];
  }

  selectOrder(order: any) {
    alert(`Wybrałeś zlecenie: Typ zlecenia: ${order.type}, Miejscowość: ${order.city}`);
  }
}
