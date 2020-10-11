using System.Text.Json;

namespace SampleBlazorApp.Shared.Extensions
{
    public static class StringExtensions
    {
        public static string FormatJson(this string jsonString)
        {
            var obj = JsonSerializer.Deserialize<object>(jsonString);
            var options = new JsonSerializerOptions { WriteIndented = true };
            return JsonSerializer.Serialize(obj, options);
        }
    }
}
