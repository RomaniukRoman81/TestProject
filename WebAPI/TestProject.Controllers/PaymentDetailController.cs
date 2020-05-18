using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestProject.Data.Models;
using TestProject.Services;
using TestProject.Services.Models.PaymentDetail;

namespace TestProject.Data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentDetailController : ControllerBase
    {
        private readonly IPaymentDetailService _paymentDetailService;

        public PaymentDetailController( IPaymentDetailService paymentDetailService)
        {
            _paymentDetailService = paymentDetailService;
        }

        // GET: api/PaymentDetail
        [HttpGet]
        [ResponseCache(Duration = 60)]
        public async Task<IActionResult> GetPaymentDetails()
        {
            try
            {
                var paymentDetails = await _paymentDetailService.GetAllAsync();
                if (paymentDetails == null)
                {
                    return NotFound();
                }

                return Ok(paymentDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/PaymentDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentDetailDto>> GetPaymentDetail(int id)
        {
            var paymentDetail = await _paymentDetailService.GetByIdAsync(id);

            if (paymentDetail == null)
            {
                return NotFound();
            }

            return paymentDetail;
        }

        // PUT: api/PaymentDetail/5
        [HttpPut]
        public async Task<IActionResult> PutPaymentDetail(PaymentDetail paymentDetail)
        {
            if (paymentDetail == null)
            {
                return BadRequest();
            }

            try
            {
                await _paymentDetailService.UpdatePaymentDetailAsync(paymentDetail);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_paymentDetailService.PaymentDetailExists(paymentDetail.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PaymentDetail
        [HttpPost]
        public async Task<ActionResult> PostPaymentDetail([FromBody]PaymentDetail paymentDetail)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var pdId = await _paymentDetailService.AddPaymentDetailAsync(paymentDetail);
                    if (pdId > 0)
                    {
                        return Ok(pdId);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/PaymentDetail/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePaymentDetail(int? id)
        {
            int result = 0;

            if(id == null)
            {
                return BadRequest();
            }
            try
            {
                result = await _paymentDetailService.DeletePaymentDetailAsync(id);
                if (result == 0)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
