import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const endpoint = 'http://localhost:8080/hrmonitor/incidents/0';

@Injectable({
  providedIn: 'root'
})
export class HttpCliService {

  constructor(private httpClient: HttpClient) { }

  private REST_API_GET_INCIDENT = "http://localhost:8080/hrmonitor/incidents/0";
  private REST_API_AUTHENTICATE = "http://localhost:8080/authentication/login";
  private REST_API_BASE_PATH = 'http://localhost:8080/hrmonitor/patient/'

  public sendGetRequest(): Observable<HttpResponse<HrIncident>> {
    return this.httpClient.get<HrIncident>(this.REST_API_GET_INCIDENT, { observe: 'response' });
  }


  public authenticate(id: String, pass: string): Observable<HttpResponse<any>> {

    var requestBody: LoginDTO = { pass: pass, id: id }

    console.log(requestBody)

    return this.httpClient.post<any>(
      this.REST_API_AUTHENTICATE,
      requestBody,
      { 'headers': HTTP_OPTIONS.headers, observe: 'response' }
    );

  }


  public getIncidentList(id: String): Observable<HttpResponse<any>> {

    var url = this.REST_API_BASE_PATH+id+"/incidents"

    console.log(url)

    return this.httpClient.get<any>(
      url,
      { 'headers': HTTP_OPTIONS.headers, observe: 'response' }
    );

  }

  public getPatienList(id: String): Observable<HttpResponse<any>> {

    var url = "http://localhost:8080/medicalStaff/"+id

    console.log(url)

    return this.httpClient.get<any>(
      url,
      { 'headers': HTTP_OPTIONS.headers, observe: 'response' }
    );

  }

  
}


export interface HrIncident {
  id: number;
  hr: number;
  ecg: number[];
  date: Date;
  patient: any;
}


export interface LoginDTO {
  pass: String;
  id: String;

}

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};


