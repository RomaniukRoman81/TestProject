import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetailDto } from 'src/app/shared/PaymenDetailDto';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {
  paymentDetailForm: FormGroup;
  model: PaymentDetailDto;


  constructor(readonly paymentDetailService: PaymentDetailService,
              private fb: FormBuilder,
              private toasterService: ToastrService) {  }

  ngOnInit() {
   // this.model = this.paymentDetailService.formData;
   this.createPaymentDetailForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.paymentDetailForm.controls; }

  onSubmit() {
    const paymentDetailModel = {
      id: this.paymentDetailForm.value.Id,
      cardOwnerName: this.paymentDetailForm.value.cardOwnerName,
      cardNumber: this.paymentDetailForm.value.cardNumber,
      expirationDate: this.paymentDetailForm.value.expirationDate,
      cVV: this.paymentDetailForm.value.cVV
    };

    if (this.paymentDetailForm.value.Id === 0) {
      this.insertForm(paymentDetailModel);
    } else {
      // this.updateForm(form);
    }
  }

  insertForm(model: PaymentDetailDto) {
    this.paymentDetailService.postPaymentDetail(model).subscribe(
      () => {
        this.paymentDetailForm.reset();
        this.toasterService.info('Created successfully', 'Peyment Detail Register');
        this.paymentDetailService.refreshPaymentDetailsList();
      });
  }

  updateForm(model: PaymentDetailDto) {
    this.paymentDetailService.putPaymentDetail().subscribe(
      () => {
        this.paymentDetailForm.reset();
        this.toasterService.info('Updated successfully', 'Peyment Detail Register');
        this.paymentDetailService.refreshPaymentDetailsList();
      });
  }

  private createPaymentDetailForm(): void {
    this.paymentDetailForm = this.fb.group({
      Id: [0],
      cardOwnerName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cVV: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }
}
