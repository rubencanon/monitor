import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCliService } from '../../services/http-cli.service'
import {DataService} from '../../services/data.service'

export interface IncidentElement{
  
  id: string;
  date: string;
  type: string;
  ecg: number[];
  hr: number;
  patientId: string;
  prediction: number[]

}
const ELEMENT_DATA: IncidentElement[] = [
{ecg:  [-53, -50, -43, -50, -58, -58, -58, -60, -77, -94, -87, -77, -82, -87, -91, -99, -87, -72, -67, -55, -53, -72, -89, -91, -87, -82, -84, -82, -77, -70, -62, -65, -7, 335, 787, 534, -420, -758, -246, -36, -145, -33, 43, -19, -7, 33, 24, 26, 43, 38, 31, 38, 48, 55, 65, 72, 77, 87, 99, 113, 125, 132, 137, 145, 147, 142, 120, 103, 94, 72, 43, 19, -9],
hr: 89.09,
id: "f8789f32-47fe-4e8a-accf-c4741839b52f",
patientId: "81754741",
type: "N",
date: '200-01-01',
prediction: [23,23,23],

}
 
];

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})

export class IncidentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'type', 'prediction'];
  dataSource = ELEMENT_DATA;
  max = 0
  constructor(
    private router: Router, 
    private httpService: HttpCliService,
    private dataService: DataService ) { }
  ngOnInit(): void {
    console.log('Dataservice: '+this.dataService.userId)
    this.httpService.getIncidentList("81754741")
    .subscribe(resp => {
      console.log('estado------' + resp.status, '-', resp.statusText, resp.body)
      this.dataSource=resp.body;
      

      if (resp.body != 'OK') {
        console.log('Error al consultar la lista de pacientes')
      }

    });



  }

  
  btnLogOut(){
    this.router.navigateByUrl('/signin');
  }
    
  btnBack(){
    this.router.navigateByUrl('/monitor');
  }

  getMax(list:any ){
   return Math.max(...list)
  }

}
