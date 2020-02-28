namespace TestProject.Data
{
   public static class DataValidation
    {
        public static class PaymentDetail
        {
            public const int MaxCardOwnerNameLength = 30;

            public const int MaxCardNumberLength = 16;

            public const int MaxExpirationDateLength = 5;

            public const int MaxCVVLength = 3;
        }
    }
}
