import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

import { User, userContact } from '../../model/user';

@Injectable()
export class UserService {
    serviceproperty = "Service Created";
    constructor(private http: HttpClient) { }

    post(user: User): Observable<User> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        return this.http.post(environment.usersUrl, JSON.stringify(user), { headers: httpHeaders }).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable)
        );
    }
    postAddress(contactInfo: userContact): Observable<User> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        return this.http.post(environment.usersUrl, JSON.stringify(contactInfo), { headers: httpHeaders }).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable)
        );
    }
    patch(user: User,id:string): Observable<User> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length':'0'
        });

       let url=environment.usersUrl+"/"+id;
       console.log("Url :"+ url);

        return this.http.put(url, JSON.stringify(user), { headers: httpHeaders }).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable)
        );
    }
    get(){
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        return this.http.get(environment.usersUrl, { headers: httpHeaders }).pipe(
            map(data => {return data;}),
            catchError(this.handleErrorObservable)
        );


        
    }
    getUser(id:string){
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        return this.http.get(environment.usersUrl+"/"+id, { headers: httpHeaders }).pipe(
            map(data => {return data;}),
            catchError(this.handleErrorObservable)
        );


        
    }

    private extractData(res: any) {
        let body = res;
        console.log("extractData");
        console.log(res);
        return body;
    }
    private handleErrorPromise(error: Response | any) {

        console.log("extractData Error");
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
    private handleErrorObservable(error: any) {
        console.error(error.message || error);
        return throwError(error);
    }
}

