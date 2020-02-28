import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {
  model: PaymentDetail;
  constructor(readonly paymentDetailService: PaymentDetailService,
              private toasterService: ToastrService) {  }

  ngOnInit() {
   // this.model = this.paymentDetailService.formData;
  }

  onSubmit(form: NgForm) {
    if (form.value.Id === 0) {
      this.insertForm(form);
    } else {
      this.updateForm(form);
    }
  }

  insertForm(form: NgForm) {
    this.paymentDetailService.postPaymentDetail().subscribe(
      () => {
        this.resetForm(form);
        this.toasterService.info('Created successfully', 'Peyment Detail Register');
        this.paymentDetailService.refreshPaymentDetailsList();
      });
  }

  updateForm(form: NgForm) {
    this.paymentDetailService.putPaymentDetail().subscribe(
      () => {
        this.resetForm(form);
        this.toasterService.info('Updated successfully', 'Peyment Detail Register');
        this.paymentDetailService.refreshPaymentDetailsList();
      });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.paymentDetailService.formData = {
        Id: 0,
        CardOwnerName: '',
        CardNumber: '',
        ExpirationDate: '',
        CVV: ''
      };
    }
  }
}
