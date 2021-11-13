import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public userId:string='';
public patientId:string='';
public patientName:string='';
public type:string='';

  constructor() { }
}
