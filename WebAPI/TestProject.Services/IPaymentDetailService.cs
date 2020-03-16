using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Services.Models.PaymentDetail;

namespace TestProject.Services
{
    public interface IPaymentDetailService
    {
        Task<IEnumerable<PaymentDetailDto>> GetAllAsync();

        Task<PaymentDetailDto> GetByIdAsync(int id);
    }
}
