import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCliService } from '../../services/http-cli.service'
export interface PacientElement {
  name: string;
  lastName: string;
  id: number;
  birthDate: string;
  gender: string;

}

const ELEMENT_DATA: PacientElement[] = [
  /* {id: 1235235, name: 'Juan ', lastName: 'Aristizabal',birthDate: new Date().toString(), gender: 'M'},
  {id: 235235235, name: 'Amy ', lastName: 'Lee',birthDate: new Date('2020-01-01').toString(), gender: 'F'},
  {id: 657567567, name: 'Maria',lastName: 'Gelez', birthDate: new Date('2020-01-01').toString(), gender: 'F'},
  {id: 576575675, name: 'Gary',lastName: 'Oldman', birthDate: new Date('2020-01-01').toString(), gender: 'M'},
 */
];

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {

   displayedColumns: string[] = ['id', 'name', 'lastName', 'birthDate', 'gender'];
   dataSource = ELEMENT_DATA;
   clickedRows = new Set<PacientElement>();

   constructor(private router: Router, private httpService: HttpCliService ) { }
  ngOnInit(): void {
    this.httpService.getPatienList("A00021")
    .subscribe(resp => {
      console.log('estado------' + resp.status, '-', resp.statusText, resp.body, resp.body.patients)
      this.dataSource=resp.body.patients;
    
    /*
      resp.body.patients.forEach((patient:Patient) => {
        console.log(patient.name)
        patients.push(patient as Patient)
      } )
      */
     //var patients: Patient =resp.body.patients[0] as Patient;
    // console.log('patients------' + patients[0].id)

     

      if (resp.body == 'ACCEPTED') {
        this.router.navigateByUrl('/patient-list');
      }

    });

  }

}

