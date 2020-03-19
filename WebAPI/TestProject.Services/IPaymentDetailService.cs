using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Data.Models;
using TestProject.Services.Models.PaymentDetail;

namespace TestProject.Services
{
    public interface IPaymentDetailService
    {
        Task<IEnumerable<PaymentDetailDto>> GetAllAsync();

        Task<PaymentDetailDto> GetByIdAsync(int paymentDetailId);

        Task<int> AddPaymentDetailAsync(PaymentDetail paymentDetail);

        Task UpdatePaymentDetailAsync(PaymentDetail paymentDetail);

        Task<int> DeletePaymentDetailAsync(int? paymentDetailId);

        bool PaymentDetailExists(int? paymentDetailId);
    }
}
