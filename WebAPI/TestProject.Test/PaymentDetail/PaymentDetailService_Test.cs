using System.Threading.Tasks;
using TestProject.Services.Implementations;
using TestProject.Services.Models.PaymentDetail;
using Xunit;

namespace TestProject.Test.PaymentDetail
{
    public class PaymentDetailService_Test : PaymentDetailServiceTestBase
    {

        [Fact]
        public async Task Should_Get_PaymentDetail_ById_Return_Dto()
        {
            // Arrange
            var paymentDetailsServise = new PaymentDetailService(_context);
            var testId = 2;

            // Act
            var result = await paymentDetailsServise.GetByIdAsync(testId);

            //Assert  
            Assert.IsType<PaymentDetailDto>(result);
        }
    }
}
