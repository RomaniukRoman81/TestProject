using System;
using System.Linq;
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
        private readonly AuthenticationContext _context;
        private readonly IPaymentDetailService _paymentDetailService;

        public PaymentDetailController(AuthenticationContext context,
                                       IPaymentDetailService paymentDetailService)
        {
            _context = context;
            _paymentDetailService = paymentDetailService;
        }

        // GET: api/PaymentDetail
        [HttpGet]
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
                return BadRequest();
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentDetail(int id, PaymentDetail paymentDetail)
        {
            if (id != paymentDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(paymentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentDetailExists(id))
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
        public async Task<ActionResult<PaymentDetail>> PostPaymentDetail(PaymentDetail paymentDetail)
        {
            _context.PaymentDetails.Add(paymentDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentDetail", new { id = paymentDetail.Id }, paymentDetail);
        }

        // DELETE: api/PaymentDetail/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PaymentDetail>> DeletePaymentDetail(int id)
        {
            var paymentDetail = await _context.PaymentDetails.FindAsync(id);
            if (paymentDetail == null)
            {
                return NotFound();
            }

            _context.PaymentDetails.Remove(paymentDetail);
            await _context.SaveChangesAsync();

            return paymentDetail;
        }

        private bool PaymentDetailExists(int id)
        {
            return _context.PaymentDetails.Any(e => e.Id == id);
        }
    }
}
