import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  user='Ruben'
  password=''
  constructor(private router: Router
    ) {

   }

  ngOnInit(): void {

  }


btnClick(event: any ) {
  console.log('+++++++++++++++++++'+ this.user +'+++++ +++++++++++++++')
 // this.router.navigateByUrl('/monitor');

};

}
