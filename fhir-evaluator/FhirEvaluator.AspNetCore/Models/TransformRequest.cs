using System.ComponentModel.DataAnnotations;

namespace Fhirata.AspNetCore.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class TransformRequest
    {
        /// <summary>
        /// Input JSON data to perform evaluation
        /// </summary>
        [Required]
        [MinLength(1, ErrorMessage = "No JSON data provided")]
        public string Json { get; set; } = null!;

        /// <summary>
        /// An expression to be evaluted
        /// </summary>
        [Required]
        [MinLength(1, ErrorMessage = "Expression is required")]
        public string Expression { get; set; } = null!;
    }
}
