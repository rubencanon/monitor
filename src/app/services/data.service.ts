import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public userId:string='';
public patientId:string='';

  constructor() { }
}