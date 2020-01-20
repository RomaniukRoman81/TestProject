import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { error } from 'util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor( readonly paymentDetailService: PaymentDetailService,
               private toaster: ToastrService) { }

  ngOnInit() {
    this.paymentDetailService.refreshPaymentDetailsList();
  }

  populateForm(pd: PaymentDetail) {
    this.paymentDetailService.formData = Object.assign({}, pd);
  }

  onDelete(id: number) {
    if (confirm('A you sure to delete this record ?')) {
      this.paymentDetailService.deletePaymentDetail(id)
        .subscribe(res => {
          this.paymentDetailService.refreshPaymentDetailsList();
          this.toaster.warning('Deleted successfully', 'Peyment Detail Register');
        },
          err => {
            console.log('Error ater deleted', err);
          }
        );
    }
  }
}
