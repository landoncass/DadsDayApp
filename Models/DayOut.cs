using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DadsDayApp.Models
{
    public class DayOut
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "You must provide a location.")]
        public string Location { get; set; }
        [Required(ErrorMessage = "You must provide a city.")]
        public string City { get; set; }
        [Required(ErrorMessage = "You must provide a review.")]
        public string Description { get; set; }

        public List<Review> Reviews { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}