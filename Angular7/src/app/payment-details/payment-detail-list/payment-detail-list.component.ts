import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetailDto } from 'src/app/shared/PaymenDetailDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.scss']
})
export class PaymentDetailListComponent implements OnInit {

  searchPayment: string;

  constructor( readonly paymentDetailService: PaymentDetailService,
               private toasterService: ToastrService) { }

  ngOnInit() {
    this.paymentDetailService.refreshPaymentDetailsList();
  }

  populateForm(pd: PaymentDetailDto) {
    this.paymentDetailService.updateFormData(pd);
  }

  onDelete(id: number) {
    if (confirm('A you sure to delete this record ?')) {
      this.paymentDetailService.deletePaymentDetail(id)
        .subscribe(() => {
          this.paymentDetailService.refreshPaymentDetailsList();
          this.toasterService.warning('Deleted successfully', 'Peyment Detail Register');
        });
    }
  }
}
