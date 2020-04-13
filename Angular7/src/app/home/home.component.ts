import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto } from '../shared/UserDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetailsFormModel: FormGroup;
  userFullName: string;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.createUserDetailsForm();
    this.userService.getUserProfile().subscribe(
      (res: UserDto) => {
        this.userFullName = res.fullName;
        this.userDetailsFormModel.setValue({
         UserName: res.userName,
         FullName: res.fullName,
         Email: res.email,
         AboutMe: res.aboutMe
        });
      });
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
