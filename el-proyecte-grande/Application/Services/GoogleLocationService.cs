using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class GoogleLocationService
    {
        public readonly string GoogleAPIKey;

        public GoogleLocationService(string apiKey)
        {
            GoogleAPIKey = apiKey;
        }
    }
}
