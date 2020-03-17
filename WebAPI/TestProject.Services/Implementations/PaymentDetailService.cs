using System;
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
        private readonly AuthenticationContext _context;

        public PaymentDetailService(AuthenticationContext context)
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

        public async Task<PaymentDetailDto> AddPaymentDetailAsync(PaymentDetail paymentDetail)
        {
            _context.PaymentDetails.Add(paymentDetail);
            await _context.SaveChangesAsync();

            return MapToEntityDto(paymentDetail);

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
