using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DadsDayApp.Models
{
    public class DayOut
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "You must provide a location.")]
        public string Location { get; set; }
        [Required(ErrorMessage = "You must provide a date.")]
        public string Date { get; set; }
        [Required(ErrorMessage = "You must provide a review.")]
        public string Description { get; set; }

        public string User { get; set; }

        public List<Review> Reviews { get; set; }
    }
}