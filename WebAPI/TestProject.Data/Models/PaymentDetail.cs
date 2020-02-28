using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static TestProject.Data.DataValidation.PaymentDetail;

namespace TestProject.Data.Models
{
    public class PaymentDetail
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        [MaxLength(MaxCardOwnerNameLength)]
        public string CardOwnerName { get; set; }

        [Required]
        [MaxLength(MaxCardNumberLength)]
        [Column(TypeName = "varchar(16)")]
        public string CardNumber { get; set; }

        [Required]
        [MaxLength(MaxExpirationDateLength)]
        [Column(TypeName = "varchar(5)")]
        public string ExpirationDate { get; set; }

        [Required]
        [MaxLength(MaxCVVLength)]
        [Column(TypeName = "varchar(3)")]
        public string CVV { get; set; }
    }
}