namespace TestProject.Services.Models.PaymentDetail
{
    public class PaymentDetailDto
    {
        public int Id { get; set; }

        public string CardOwnerName { get; set; }             

        public string CardNumber { get; set; }

        public string ExpirationDate { get; set; }

        public string CVV { get; set; }
    }
}
