using Microsoft.EntityFrameworkCore;
using System;
using TestProject.Data.Models;

namespace TestProject.Test.PaymentDetail
{
    public class PaymentDetailServiceTestBase : IDisposable
    {
        protected readonly AuthenticationContext _context;

        public PaymentDetailServiceTestBase()
        {
            var options = new DbContextOptionsBuilder<AuthenticationContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AuthenticationContext(options);

            _context.Database.EnsureCreated();

            CreateTestData(_context);
        }

        private void CreateTestData(AuthenticationContext context)
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

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
