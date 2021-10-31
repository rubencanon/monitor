import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient,HttpResponse, HttpHeaders, HttpErrorResponse,HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/hrmonitor/incidents/0';

@Injectable({
  providedIn: 'root'
})
export class HttpCliService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Bearer 123') });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }

  constructor(private httpClient: HttpClient) { }

  private REST_API_GET_INCIDENT= "http://localhost:8080/hrmonitor/incidents/0";
  private REST_API_AUTHENTICATE = "http://localhost:8080/authentication/login";


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }
 


  public sendGetRequest():Observable<HttpResponse<HrIncident>>{
    return this.httpClient.get<HrIncident>(this.REST_API_GET_INCIDENT, { observe: 'response' });
  }
  

  public authenticate( id : String, pass:string):Observable<HttpResponse<any>>{

    var req: LoginDTO={pass:pass, id:id}
   var headers : HttpHeaders= new HttpHeaders();
   headers.set("Access-Control-Allow-Origin", "*")
   headers.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
   headers.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
  
   headers.set("pass","899878");
console.log( req)
   // this.httpClient.get( this.REST_API_AUTHENTICATE+id,{'headers':headers} )
 //   return this.httpClient.post<any>(this.REST_API_AUTHENTICATE, req);
 //return this.httpClient.post<any>(this.REST_API_AUTHENTICATE, body, {'headers':headers}, { observe: 'response' } );
 return this.httpClient.post<any>(this.REST_API_AUTHENTICATE,req,  {'headers':headers, observe: 'response' } );

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
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };


