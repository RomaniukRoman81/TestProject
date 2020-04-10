using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TestProject.Data.Models;
using TestProject.Services.Models.PaymentDetail;
using System.Linq;

namespace TestProject.Services.Implementations
{
    public class PaymentDetailService : IPaymentDetailService
    {
        private readonly TestProjectContext _context;

        public PaymentDetailService(TestProjectContext context)
        {
           _context = context;
        }

        // use async if we are expecting more count users
        public async Task<IEnumerable<PaymentDetailDto>> GetAllAsync()
        {
            if (_context != null)
            {
                return await _context.PaymentDetails
                    .Select(pd => new PaymentDetailDto
                    {
                        Id = pd.Id,
                        CardOwnerName = pd.CardOwnerName,
                        CardNumber = pd.CardNumber,
                        CVV = pd.CVV,
                        ExpirationDate = pd.ExpirationDate
                    })
                    .ToListAsync();
            }
            return null;
        }

        public async Task<PaymentDetailDto> GetByIdAsync(int id)
        {
            if (_context != null)
            {
                var paymentDetail = await _context.PaymentDetails.FindAsync(id);
                if (paymentDetail == null)
                {
                    return null;
                }
                return MapToEntityDto(paymentDetail);

            }
            return null;
        }

        public async Task<int> AddPaymentDetailAsync(PaymentDetail paymentDetail)
        {
            if (_context != null)
            {
                await _context.PaymentDetails.AddAsync(paymentDetail);
                await _context.SaveChangesAsync();

                return paymentDetail.Id;
            }
            return 0;
        }

        public async Task UpdatePaymentDetailAsync(PaymentDetail paymentDetail)
        {
            if(_context != null)
            {
                _context.Update(paymentDetail);

                await _context.SaveChangesAsync();
            }
        }


        public async Task<int> DeletePaymentDetailAsync(int? paymentDetailId)
        {
            int result = 0;

            if (_context != null)
            {
                var pd = await _context.PaymentDetails.FirstOrDefaultAsync(x => x.Id == paymentDetailId);
                if (pd != null)
                {
                    _context.PaymentDetails.Remove(pd);

                    // Commit the transaction
                    result = await _context.SaveChangesAsync();
                }

                return result;
            }

            return result;
        }

        public bool PaymentDetailExists(int? id)
        {
            return _context.PaymentDetails.Any(e => e.Id == id);
        }

        private PaymentDetailDto MapToEntityDto(PaymentDetail entity)
        {
            var paymentDetail = new PaymentDetailDto
            {
                Id = entity.Id,
                CardOwnerName = entity.CardOwnerName,
                CardNumber = entity.CardNumber,
                CVV = entity.CVV,
                ExpirationDate = entity.ExpirationDate
            };

            return paymentDetail;
        }
    }
}
