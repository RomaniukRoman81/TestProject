import { Injectable } from '@angular/core';
import { PaymentDetailDto } from './PaymenDetailDto';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  formDataSource: BehaviorSubject<PaymentDetailDto> = new BehaviorSubject(new PaymentDetailDto());

  formDataForUpdate = this.formDataSource.asObservable();

  listPaymentDetails: PaymentDetailDto[];

  constructor(private http: HttpClient,
              private readonly constants: Constants) { }

  updateFormData(data: PaymentDetailDto) {
    this.formDataSource.next(data);
  }

  postPaymentDetail(model: PaymentDetailDto) {
    return this.http.post(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}`, model);
  }

  putPaymentDetail(model: PaymentDetailDto) {
    return this.http.put(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}`, model);
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}/${id}`);
  }

  refreshPaymentDetailsList() {
    this.http.get(`${this.constants.apiRoutes.workBaseUrl}${this.constants.apiRoutes.paymentDetailUrl}`)
      .subscribe(
        res => this.listPaymentDetails = res as PaymentDetailDto[]
      );
  }
}
