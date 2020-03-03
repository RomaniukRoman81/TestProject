using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TestProject.Data.Models;

namespace TestProject.Services.Implementations
{
    public class PaymentDetailService :IPaymentDetailService
    {
        private readonly AuthenticationContext _context;

        public PaymentDetailService(AuthenticationContext context)
        {
           _context = context;
        }

        // use async if we are expecting more count users
        public async Task<IEnumerable<PaymentDetail>> GetAll()
        {
            if (_context != null)
            {
                return await _context.PaymentDetails.ToListAsync();
            }
            return null;
        }
    }
}
