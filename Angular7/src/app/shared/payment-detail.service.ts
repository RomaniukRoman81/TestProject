import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail = {
    PMId: 0,
    CardOvnerName: '',
    CardNumber: '',
    ExpirationDate: '',
    CVV: ''
  };
  listPaymentDetails: PaymentDetail[];

  readonly rootURL = 'http://localhost:56283/api/';

  constructor(private http: HttpClient) { }

  postPaymentDetail() {
   return this.http.post(`${this.rootURL}PaymentDetail`, this.formData);
  }

  putPaymentDetail() {
   return this.http.put(`${this.rootURL}PaymentDetail/${this.formData.PMId}`, this.formData);
  }

  deletePaymentDetail(id: number) {
   return this.http.delete(`${this.rootURL}PaymentDetail/${id}`);
  }

  refreshPaymentDetailsList() {
    this.http.get(`${this.rootURL}PaymentDetail`)
      .subscribe(
        res => this.listPaymentDetails = res as PaymentDetail[]
      );
  }
}
