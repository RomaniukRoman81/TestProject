import { Pipe, PipeTransform } from '@angular/core';
import { PaymentDetailDto } from '../PaymenDetailDto';

@Pipe({
  name: 'searchPayment'
})
export class SearchPaymentPipe implements PipeTransform {

  transform(pipePaymentData: PaymentDetailDto[], searchPayment: string): any {
    if (!pipePaymentData) { return []; }

    if (!searchPayment) { return pipePaymentData; }

    searchPayment = searchPayment.toLocaleLowerCase();

    return pipePaymentData.filter(payment => {
      return payment.cardOwnerName.toLocaleLowerCase().includes(searchPayment);
    });
  }
}
