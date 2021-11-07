import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../../services/data.service'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

   patient:String = this.dataService.patientName
  constructor(    private router: Router,
    private dataService:DataService

    ) { }

  ngOnInit(): void {
  }
  btnClick(){
    this.router.navigateByUrl('/patient-list');


  }
  btnLogOut(){
    this.router.navigateByUrl('/signin');
  }

}
