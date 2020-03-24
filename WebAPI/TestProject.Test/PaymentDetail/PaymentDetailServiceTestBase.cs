using TestProject.Data.Models;
using TestProject.Services;

namespace TestProject.Test.PaymentDetail
{
    public class PaymentDetailServiceTestBase
    {
        private readonly AuthenticationContext _context;
        public PaymentDetailServiceTestBase(AuthenticationContext context)
        {
            _context = context;
        }

        protected void CreateTestData()
        {
            var paymentDetail1 = new TestProject.Data.Models.PaymentDetail
            {
                Id = 1,
                CardOwnerName = "TestCardOwner1",
                CardNumber = "1111111111111111",
                ExpirationDate = "02/25",
                CVV = "111"
            };

            var paymentDetail2 = new TestProject.Data.Models.PaymentDetail
            {
                Id = 2,
                CardOwnerName = "TestCardOwner2",
                CardNumber = "1111111111111112",
                ExpirationDate = "02/24",
                CVV = "112"
            };

            _context.AddRange(paymentDetail1, paymentDetail2);
            _context.SaveChanges();
        }
    }
}
