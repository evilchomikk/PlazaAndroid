import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path: 'weather', component: WeatherComponent},
  {path:'orders', component: OrdersComponent},
  {path: '', redirectTo: '/weather', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
 
