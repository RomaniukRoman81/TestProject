using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Data.Models;
using TestProject.Services.Models.PaymentDetail;

namespace TestProject.Services
{
    public interface IPaymentDetailService
    {
        Task<IEnumerable<PaymentDetailDto>> GetAllAsync();

        Task<PaymentDetailDto> GetByIdAsync(int id);

        Task<PaymentDetailDto> AddPaymentDetailAsync(PaymentDetail paymentDetail);
    }
}
