import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

     login(username: string, password: string) { 

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });

        // let body=new URLSearchParams();
        // body.set("client_id","testweb");
        // body.set("grant_type","password");
        // body.set("client_secret","GzlZKMhHnIr5sUzxCPZHGJSwn4dzHkWA");
        // body.set("scope","openid");
        // body.set("username",username);
        // body.set("password",password);    
        let body={"username":username,"password":password}
     
     //   let strValues ="client_id=testweb&grant_type=password&client_secret=GzlZKMhHnIr5sUzxCPZHGJSwn4dzHkWA&scope=openid& username=testuser& password=Test123$"
        return this.http.post<any>(environment.loginUrl,body,{headers:httpHeaders})
            .pipe(map(user => {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
               return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);


    }
}