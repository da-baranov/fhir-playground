namespace Fhirata.AspNetCore.Models
{
    public class StoreResponse<T> : ApiResponse
    {
        public StoreResponse()
        {
            Success = true;
        }

        public int Total { get; set; }

        public List<T> Data { get; set; }
    }
}
