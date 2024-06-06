import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IpService } from '../ip.service';
import { Ilogin } from '../../model/Ilogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router,private ip:IpService) { }

  ngOnInit(): void {
  }

  logindata: Ilogin = {
    username: '',
    password: ''
  
  }

 async loginUser(){

    await fetch('http://'+this.ip.Ip+':8080/api/auth/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.logindata)
    })
    .then(response => {
      if (response.ok) {
        this.router.navigate(['/orders']);
      } else {
        console.log(response);
      throw new Error('Network response was not ok');
      
      }
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }
}
