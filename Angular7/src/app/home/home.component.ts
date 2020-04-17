import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto } from '../shared/UserDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private userId: string;

  userDetailsFormModel: FormGroup;
  userFullName: string;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toasterService: ToastrService) { }

  ngOnInit() {
    this.createUserDetailsForm();
    this.userService.getUserProfile().subscribe(
      (res: UserDto) => {
        this.userFullName = res.fullName;
        this.userId = res.id;
        this.userDetailsFormModel.setValue({
         UserName: res.userName,
         FullName: res.fullName,
         Email: res.email,
         AboutMe: res.aboutMe
        });
      });
  }

  onSubmit() {
    const userProfileDto = {
      id: this.userId,
      fullName: this.userDetailsFormModel.value.FullName,
      userName: this.userDetailsFormModel.value.UserName,
      email: this.userDetailsFormModel.value.Email,
      aboutMe: this.userDetailsFormModel.value.AboutMe
    };
    this.userService.updateUser(userProfileDto).subscribe(() => {
      this.toasterService.info('Updated successfully', 'User Detail');
      this.userFullName = this.userDetailsFormModel.value.FullName;
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
