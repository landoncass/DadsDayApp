using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DadsDayApp.Models;

namespace DadsDayApp.Controllers
{
    // All of these routes will be at the base URL:     /api/Reviews
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case ReviewsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public ReviewsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        //
        // Returns a list of all your Reviews
        //




        // PUT: api/Reviews/5
        //
        // Update an individual review with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Review
        // variable named review. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Review POCO class. This represents the
        // new values for the record.
        //



        // POST: api/Reviews
        //
        // Creates a new review in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Review
        // variable named review. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Review POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            // Set the UserID to the current user id, this overrides anything the user specifies.
            review.UserId = GetCurrentUserId();
            // Indicate to the database context we want to add this new record
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }

        // DELETE: api/Reviews/5
        //
        // Deletes an individual review with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            // Find this review by looking for the specific id
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                // There wasn't a review with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Reviews.Remove(review);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(review);
        }

        // Private helper method that looks up an existing review by the supplied id

    }
}
