import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UserInfo } from '../pages/homepage/Interfaces';

@Injectable()
export class HomeService {
   serviceproperty = "Service Created";
   constructor(private http: HttpClient) { } 
 
   adduser(book: UserInfo): Observable<UserInfo> {
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    });
    return this.http.get(environment.apiUrl).pipe(
        map(this.extractData),
        catchError(this.handleErrorObservable)
    );
}
 
private extractData(res: any) {
	let body = res;
    console.log(res);
	return body;
}
private handleErrorPromise(error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
}  
private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
}
}

