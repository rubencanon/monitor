import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCliService } from '../../services/http-cli.service'
import { Subject } from 'rxjs';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/** Error when invalid control is dirty, touched, or submitted. */
import {DataService} from '../../services/data.service'

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = ''
  password = ''
  error = ''
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
     private httpService: HttpCliService,
     private dataService: DataService
     
  ) {

  }

  ngOnInit(): void {
    this.user = ''
    this.password = ''
    this.error = ''
  }


  btnClick(event: any) {
    console.log('+++++++++++++++++++' + this.user + '+++++ +++++++++++++++')


    this.httpService.authenticate(this.user, this.password)
    .subscribe(resp => {
      console.log('estado------' + resp.status, '-', resp.statusText, resp.body)

      if (resp.body == 'ACCEPTED') {
        this.router.navigateByUrl('/patient-list');
        this.dataService.userId = this.user;
      }else{
        this.error= 'Credenciales invalidas'
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

  userFormControl = new FormControl('', [
    Validators.required,
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new CustomErrorStateMatcher();
 
  openDialog(): void {

    };
  

}
