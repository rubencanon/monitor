import { Component, OnInit } from '@angular/core';

export interface PacientElement {
  name: string;
  lastName: string;
  id: number;
  age: number;
  gender: string;

}

const ELEMENT_DATA: PacientElement[] = [
  {id: 1235235, name: 'Juan ', lastName: 'Aristizabal',age: 34, gender: 'M'},
  {id: 235235235, name: 'Amy ', lastName: 'Lee',age: 78, gender: 'F'},
  {id: 657567567, name: 'Maria',lastName: 'Gelez', age: 45, gender: 'F'},
  {id: 576575675, name: 'Gary',lastName: 'Oldman', age: 23, gender: 'M'},

];

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {

   displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'gender'];
   dataSource = ELEMENT_DATA;
   clickedRows = new Set<PacientElement>();

  constructor() {}

  ngOnInit(): void {
  }

}
