import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url = environment.base_url;
  auth2: any;
  user: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { 
    this.googleInit();
  }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.user.uid || '';
  }

  createUser(formData: RegisterForm){
    return this.http.post(`${this.base_url}/users`, formData).pipe(tap( (ans: any) => {
      localStorage.setItem('token', ans.token);
    }))
  }

  updateUser(data: {email: string, name: string, role: string}){
    data = {...data, role: this.user.role}

    return this.http.put(`${this.base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm){
    return this.http.post(`${this.base_url}/login`, formData).pipe(tap( (ans: any) => {
      localStorage.setItem('token', ans.token);
    }))
  }

  googleInit(){
    return new Promise(resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '355769515170-b2nftgkikbj7qtuihr0ffc6c8spitoh3.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve();
      });
    })
  }

  loginGoogle(token){
    return this.http.post(`${this.base_url}/login/google`, {token}).pipe(tap( (ans: any) => {
      localStorage.setItem('token', ans.token);
    }))
  }

  validateToken(): Observable<boolean>{

    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (ans: any) => {
        const {email, google, name, role, img = '', uid} = ans.user;
        this.user = new User(name, email, '', img, google, role, uid);

        localStorage.setItem('token', ans.token);

        return true;
      }),
      catchError(err => of(false))
    );
  }

  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })

    });
  }
}
