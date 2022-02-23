using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,50}$", ErrorMessage = "Password must have at least 4 characters, must contain at least one lower-case letter, one upper-case letter, one digit and a special character")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

    }
}