using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DadsDayApp.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Geocoding.Microsoft;
using Microsoft.Extensions.DependencyInjection;

namespace DadsDayApp.Controllers
{
    // All of these routes will be at the base URL:     /api/DaysOut
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case DaysOutController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class DaysOutController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;
        private readonly string BING_MAPS_KEY;

        // Constructor that receives a reference to your database context
        // and stores it in _context_ for you to use in your API methods
        [ActivatorUtilitiesConstructor]
        public DaysOutController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            BING_MAPS_KEY = config["BING_MAPS_KEY"];
        }

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public DaysOutController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/DaysOut
        //
        // Returns a list of all your DaysOut
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DayOut>>> GetDaysOut(string filter)
        {
            // Uses the database context in `_context` to request all of the DaysOut, sort
            // them by row id and return them as a JSON array.
            if (filter == null)
            {
                return await _context.DaysOut.
                        OrderByDescending(row => row.Id).
                        Include(dayOut => dayOut.Reviews).
                        ToListAsync();
            }
            else
            {
                return await _context.DaysOut.
                        OrderByDescending(row => row.Id).
                        Where(dayOut => dayOut.Location.ToLower().
                        Contains(filter.ToLower())).
                        Include(dayOut => dayOut.Reviews).
                        ToListAsync();
            }

        }

        // GET: api/DaysOut/5
        //
        // Fetches and returns a specific dayOut by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<DayOut>> GetDayOut(int id)
        {
            // Find the dayOut in the database using `FindAsync` to look it up by id
            var dayOut = await _context.DaysOut.
                                    Include(dayOut => dayOut.Reviews).
                                    ThenInclude(review => review.User).
                                    Where(dayOut => dayOut.Id == id).
                                    FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (dayOut == null)
            {
                // Return a `404` response to the client indicating we could not find a dayOut with this id
                return NotFound();
            }

            //  Return the dayOut as a JSON object.
            return dayOut;
        }

        // PUT: api/DaysOut/5
        //
        // Update an individual dayOut with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a DayOut
        // variable named dayOut. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our DayOut POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDayOut(int id, DayOut dayOut)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != dayOut.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in dayOut to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from dayOut
            _context.Entry(dayOut).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!DayOutExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(dayOut);
        }

        // POST: api/DaysOut
        //
        // Creates a new dayOut in the database.
        //
        // The `body` of the request is parsed and then made available to us as a DayOut
        // variable named dayOut. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our DayOut POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<DayOut>> PostDayOut(DayOut dayOut)
        {
            // Set the UserID to the current user id, this overrides anything the user specifies.
            dayOut.UserId = GetCurrentUserId();

            // Create a new geocoder
            var geocoder = new BingMapsGeocoder(BING_MAPS_KEY);

            // Request this address to be geocoded.
            var geocodedAddresses = await geocoder.GeocodeAsync(dayOut.Address);

            // ... and pick out the best address sorted by the confidence level
            var bestGeocodedAddress = geocodedAddresses.OrderBy(address => address.Confidence).FirstOrDefault();

            // If we have a best geocoded address, use the latitude and longitude from that result
            if (bestGeocodedAddress != null)
            {
                dayOut.Latitude = bestGeocodedAddress.Coordinates.Latitude;
                dayOut.Longitude = bestGeocodedAddress.Coordinates.Longitude;
            }
            // Indicate to the database context we want to add this new record
            _context.DaysOut.Add(dayOut);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetDayOut", new { id = dayOut.Id }, dayOut);
        }

        // DELETE: api/DaysOut/5
        //
        // Deletes an individual dayOut with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDayOut(int id)
        {
            // Find this dayOut by looking for the specific id
            var dayOut = await _context.DaysOut.FindAsync(id);
            if (dayOut == null)
            {
                // There wasn't a dayOut with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.DaysOut.Remove(dayOut);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(dayOut);
        }

        // Private helper method that looks up an existing dayOut by the supplied id
        private bool DayOutExists(int id)
        {
            return _context.DaysOut.Any(dayOut => dayOut.Id == id);
        }

        // Private helper method to get the JWT claim related to the user ID
        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}
