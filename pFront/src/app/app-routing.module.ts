import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';

const routes: Routes = [
  {path: 'weather', component: WeatherComponent},
  {path:'orders', component: OrdersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new-orders', component: NewOrdersComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
 
