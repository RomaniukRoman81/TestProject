import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetailsFormModel: FormGroup;
  userFullName: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.createUserDetailsForm();
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        console.log('test data', res);
        this.userFullName = res.fullName;
        this.userDetailsFormModel.setValue({
         UserName: res.userName,
         FullName: res.fullName,
         Email: res.email,
         AboutMe: res.aboutMe
        });
      },
      err => {
        console.log('Error from home component', err);
      }
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  private createUserDetailsForm(): void {
    this.userDetailsFormModel = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.email, Validators.required]],
      FullName: [''],
      AboutMe: ['']
    });
  }
}
