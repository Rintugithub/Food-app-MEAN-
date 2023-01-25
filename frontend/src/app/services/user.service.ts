import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../shared/model/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  token: any;

  constructor(private http:HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }
  public get currentUser():User{
    return this.userSubject.value;
  }
  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user)
          // alert(`welcome ${user.name} to Foodmine`);
        },
        error:(errorResponse)=>{
          alert(`${errorResponse.error}, login failed`);

        }
      })
    );
  }
  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
      alert(`Welcome to the Foodmine ${user.name},
            "Register Successful"`)
        },
        error: (errorResponse) => {
          alert(`${errorResponse.error}, Register failed`);
        }
      })
    )
  }

  logOut(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

}
