import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURL = 'http://localhost:56283/api/';

  register(signInModel: any) {
    return this.http.post(`${this.BaseURL}ApplicationUser/Register`, signInModel);
  }

  logIn(logInModel: any) {
    return this.http.post(`${this.BaseURL}ApplicationUser/Login`, logInModel);
  }

  getUserProfile() {
   // const tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(`${this.BaseURL}UserProfile`);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    const userRole = payLoad.role;

    allowedRoles.forEach(element => {
      if (userRole === element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  comparePasswords(fg: FormGroup) {
    const confirmPasswordCtrl = fg.get('ConfirmPassword');

    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
        if (fg.get('Password').value !== confirmPasswordCtrl.value) {
            confirmPasswordCtrl.setErrors({passwordMismatch: true});
        } else { confirmPasswordCtrl.setErrors(null); }
    }
  }
}

