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
              private toaster: ToastrService) {  }

  ngOnInit() {
   // this.model = this.paymentDetailService.formData;
  }

  onSubmit(form: NgForm) {
    if (form.value.PMId === 0) {
      this.insertForm(form);
    } else {
      this.updateForm(form);
    }
  }

  insertForm(form: NgForm) {
    this.paymentDetailService.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toaster.info('Created successfully', 'Peyment Detail Register');
        this.paymentDetailService.refreshPaymentDetailsList();
      },
      err => {
        console.log('Error postPaymentDetail', err);
      }
    );
  }

  updateForm(form: NgForm) {
    this.paymentDetailService.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toaster.info('Updated successfully', 'Peyment Detail Register');
        this.paymentDetailService.refreshPaymentDetailsList();
      },
      err => {
        console.log('Error postPaymentDetail', err);
      }
    );
  }

  resetForm(form: NgForm) {
    if (form != null) {
      form.reset();
      this.paymentDetailService.formData = {
        PMId: 0,
        CardOvnerName: '',
        CardNumber: '',
        ExpirationDate: '',
        CVV: ''
      };
    }
  }
}
