using AutoMapper;
using TestProject.Data.Models;
using TestProject.Services.Models.PaymentDetail;

namespace TestProject.Services.AutoMapper
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<PaymentDetail, PaymentDetailDto>();
        }
    }
}
