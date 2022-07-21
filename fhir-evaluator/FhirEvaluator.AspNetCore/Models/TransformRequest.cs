using System.ComponentModel.DataAnnotations;

namespace FhirEvaluator.AspNetCore.Models
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
        public string Json { get; set; } = null!;

        /// <summary>
        /// An expression to be evaluted
        /// </summary>
        [Required]
        public string Expression { get; set; } = null!;
    }
}
