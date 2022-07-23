using System.ComponentModel.DataAnnotations;

namespace Fhirata.AspNetCore.Models
{
    public class TransformResponse : ApiResponse
    {
        /// <summary>
        /// Input JSON data to perform evaluation
        /// </summary>
        public string? Json { get; set; }

        /// <summary>
        /// An expression to be evaluted
        /// </summary>
        public string? Expression { get; set; }

        /// <summary>
        /// Evaluated or transformed output data, or expression evaluation result
        /// </summary>
        public string? Result { get; set; }
    }
}
