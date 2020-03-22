import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {
  paymentDetailForm: FormGroup;
  model: PaymentDetail;


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
      Id: this.paymentDetailForm.value.Id,
      CardOwnerName: this.paymentDetailForm.value.cardOwnerName,
      CardNumber: this.paymentDetailForm.value.cardNumber,
      ExpirationDate: this.paymentDetailForm.value.expirationDate,
      CVV: this.paymentDetailForm.value.cVV
    };

    if (this.paymentDetailForm.value.Id === 0) {
      this.insertForm(paymentDetailModel);
    } else {
      // this.updateForm(form);
    }
  }

  insertForm(model: PaymentDetail) {
    this.paymentDetailService.postPaymentDetail(model).subscribe(
      () => {
        this.paymentDetailForm.reset();
        this.toasterService.info('Created successfully', 'Peyment Detail Register');
        // this.paymentDetailService.refreshPaymentDetailsList();
      });
  }

  updateForm(form: NgForm) {
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
