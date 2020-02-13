import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

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

  readonly rootURL = 'http://localhost:56283/api/';
  readonly rootURL1 = 'http://localhost:60702/api/';


  constructor(private http: HttpClient) { }

  postPaymentDetail() {
   return this.http.post(`${this.rootURL1}PaymentDetail`, this.formData);
  }

  putPaymentDetail() {
   return this.http.put(`${this.rootURL1}PaymentDetail/${this.formData.Id}`, this.formData);
  }

  deletePaymentDetail(id: number) {
   return this.http.delete(`${this.rootURL1}PaymentDetail/${id}`);
  }

  refreshPaymentDetailsList() {
    this.http.get(`${this.rootURL1}PaymentDetail`)
      .subscribe(
        res => this.listPaymentDetails = res as PaymentDetail[]
      );
  }
}
