using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Data.Models;

namespace TestProject.Services
{
    public interface IPaymentDetailService
    {
        Task<IEnumerable<PaymentDetail>> GetAll();
    }
}
