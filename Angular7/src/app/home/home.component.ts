import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.createUserDetailsForm();
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userFullName = res.FullName;
        this.userDetailsFormModel.setValue({
         UserName: res.UserName,
         FullName: res.FullName,
         Email: res.Email,
         AboutMe: res.AboutMe
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
