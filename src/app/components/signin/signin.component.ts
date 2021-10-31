import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCliService } from '../../services/http-cli.service'

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = 'Ruben'
  password = ''
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private httpService: HttpCliService
  ) {

  }

  ngOnInit(): void {

  }


  btnClick(event: any) {
    console.log('+++++++++++++++++++' + this.user + '+++++ +++++++++++++++')


    this.httpService.authenticate(this.user, this.password)
    .subscribe(resp => {
      console.log('estado------' + resp.status, '-', resp.statusText, resp.body)
      if (resp.body == 'ACCEPTED') {
        this.router.navigateByUrl('/patient-list');
      }

    });




    /* this.httpService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
       console.log('****getData'+data.date)
     })  
   */


  };

  getIncident() {

    this.httpService.sendGetRequest()
      .subscribe(resp => {
        console.log(resp);
        const keys = resp.headers.keys();
        console.log('------' + keys)
        console.log('------' + resp.status)
        console.log('------' + resp.body)
        if (true) {
          this.router.navigateByUrl('/monitor');

        }

      });


  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}

