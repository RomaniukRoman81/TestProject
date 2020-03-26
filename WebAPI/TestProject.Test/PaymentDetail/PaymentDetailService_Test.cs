using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Services.Implementations;
using TestProject.Services.Models.PaymentDetail;
using Xunit;

namespace TestProject.Test.PaymentDetail
{
    public class PaymentDetailService_Test : PaymentDetailServiceTestBase
    {

        [Fact]
        public async Task Should_Get_All_PaymentDetail_Return_List()
        {
            // Arrange            
            var paymentDetailsServise = new PaymentDetailService(_context);

            // Act
            var result = await paymentDetailsServise.GetAllAsync();

            //Assert  
            Assert.IsAssignableFrom<IEnumerable<PaymentDetailDto>>(result);
        }

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

        [Fact]
        public async Task Should_Add_PaymentDetail_Return_Id()
        {
            // Arrange
            var paymentDetailsServise = new PaymentDetailService(_context);
            var testPD = new TestProject.Data.Models.PaymentDetail
            {
                Id = 3,
                CardOwnerName = "TestCardOwnerName",
                CardNumber = "1231231231231231",
                ExpirationDate = "11/24",
                CVV = "123"
            };

            // Act
            var result = await paymentDetailsServise.AddPaymentDetailAsync(testPD);

            //Assert  
            Assert.True(result > 0);
        }

        [Fact]
        public async Task Should_Delete_PaymentDetail_Return_Success()
        {
            // Arrange
            var paymentDetailsServise = new PaymentDetailService(_context);
            var testId = 1;

            // Act
            var result = await paymentDetailsServise.DeletePaymentDetailAsync(testId);

            //Assert  
            Assert.True(result > 0);
        }

        [Fact]
        public async Task Should_Delete_PaymentDetail_Return_Error()
        {
            // Arrange
            var paymentDetailsServise = new PaymentDetailService(_context);
            var testId = 3;

            // Act
            var result = await paymentDetailsServise.DeletePaymentDetailAsync(testId);

            //Assert  
            Assert.True(result == 0);
        }

        [Fact]
        public void Should_PaymentDetail_Exists_Return_True()
        {
            // Arrange
            var paymentDetailsServise = new PaymentDetailService(_context);
            var testId = 2;

            // Act
            var result = paymentDetailsServise.PaymentDetailExists(testId);

            //Assert  
            Assert.True(result);
        }

        [Fact]
        public void Should_PaymentDetail_Exists_Return_False()
        {
            // Arrange
            var paymentDetailsServise = new PaymentDetailService(_context);
            var testId = 3;

            // Act
            var result = paymentDetailsServise.PaymentDetailExists(testId);

            //Assert  
            Assert.False(result);
        }
    }
}
