using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TestProject.Data.Models;
using TestProject.Services;
using Xunit;

namespace TestProject.Test.PaymentDetail
{
    public class PaymentDetailService_Test : PaymentDetailServiceTestBase
    {
        private readonly IPaymentDetailService _paymentDetailService;

        public PaymentDetailService_Test(IPaymentDetailService paymentDetailService, AuthenticationContext context) : base(context)
        {
            _paymentDetailService = paymentDetailService;
            CreateTestData();
        }

        [Fact]
        public async Task Should_Get_All_PaymentDetails_Return_List()
        {
            var paymentDetails = await _paymentDetailService.GetAllAsync();

            //Assert  
            Assert.IsType<OkObjectResult>(paymentDetails);
        }

    }
}
