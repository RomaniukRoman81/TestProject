import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  logInFormModel: FormGroup;
  signInFormModel: FormGroup;

  constructor(public userService: UserService,
              private router: Router,
              private toaster: ToastrService,
              private fb: FormBuilder,
              private elementRef: ElementRef) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
     }
    this.createlogInForm();
    this.createSignInForm();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.img__btn')
                                 .addEventListener('click', this.onClickSignInUp.bind(this));
  }

  onClickSignInUp() {
    this.elementRef.nativeElement.querySelector('.cont').classList.toggle('s--signup');
  }

  logIn() {
    const logInModel = {
      UserName: this.logInFormModel.value.UserName,
      Password: this.logInFormModel.value.Password
    };

    this.userService.logIn(logInModel).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.logInFormModel.reset();
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status === 400) {
          this.toaster.error('Incorrect UserName or Password.', 'Authentication failed:(');
         } else {
           console.log(err);
         }
      }
    );
  }

  signIn() {
    const signInModel = {
      UserName: this.signInFormModel.value.UserName,
      Email: this.signInFormModel.value.Email,
      FullName: this.signInFormModel.value.FullName,
      Password: this.signInFormModel.value.Passwords.Password,
      ConfirmPassword: this.signInFormModel.value.Passwords.ConfirmPassword
    };

    this.userService.register(signInModel).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.toaster.success('Registration successfully', 'Test Project;)');
          this.signInFormModel.reset();
          // TODO check redirect after registration!
          this.router.navigateByUrl('/home');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toaster.error('Registration failed', `User name
                                    ${this.signInFormModel.get('UserName').value} is already taken.`);
                break;

              default:
                  this.toaster.error(element.description, 'Registration failed:(');
                  break;
            }
          });
        }
      },
      err => {
        console.log('Error from register', err);
      }
    );
  }

  private createlogInForm(): void {
    this.logInFormModel = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private createSignInForm(): void {
    this.signInFormModel = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', Validators.email],
      FullName: [''],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required]
      }, {validator: this.userService.comparePasswords})
    });
  }
}
