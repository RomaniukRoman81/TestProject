import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail = {
    Id: 0,
    CardOwnerName: '',
    CardNumber: '',
    ExpirationDate: '',
    CVV: ''
  };
  listPaymentDetails: PaymentDetail[];

  constructor(private http: HttpClient,
              private readonly constants: Constants) { }

  postPaymentDetail() {
   return this.http.post(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}`, this.formData);
  }

  putPaymentDetail() {
   return this.http.put(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}
                         ${this.formData.Id}`, this.formData);
  }

  deletePaymentDetail(id: number) {
   return this.http.delete(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}${id}`);
  }

  refreshPaymentDetailsList() {
    this.http.get(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}`)
      .subscribe(
        res => this.listPaymentDetails = res as PaymentDetail[]
      );
  }
}
