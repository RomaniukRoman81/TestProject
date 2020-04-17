import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { UserDto } from './UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private readonly constants: Constants) { }

  register(signInModel: any) {
    return this.http.post(this.constants.apiRoutes.workBaseUrl + this.constants.apiRoutes.userRegisterUrl, signInModel);
  }

  logIn(logInModel: any) {
    return this.http.post(this.constants.apiRoutes.workBaseUrl + this.constants.apiRoutes.userLoginUrl, logInModel);
  }

  getUserProfile() {
    return this.http.get(this.constants.apiRoutes.workBaseUrl + this.constants.apiRoutes.userProfileUrl);
  }

  updateUser(userDto: any) {
      return this.http.put(this.constants.apiRoutes.workBaseUrl + this.constants.apiRoutes.userProfileUrl, userDto);
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
    const confirmPasswordCtrl = fg.get('confirmPassword');

    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
        if (fg.get('password').value !== confirmPasswordCtrl.value) {
            confirmPasswordCtrl.setErrors({passwordMismatch: true});
        } else { confirmPasswordCtrl.setErrors(null); }
    }
  }
}
