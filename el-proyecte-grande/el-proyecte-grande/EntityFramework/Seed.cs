using el_proyecte_grande.Models;
using IronXL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace el_proyecte_grande.EntityFramework
{
    public class Seed
    {
        public static string SEEDPATH = Path.GetFullPath(".\\EntityFramework").ToString();

        public static async Task SeedData(PetContext context)
        {
            if (context.Posts.Any())
            {
                var postList = new List<Post>();
                var filePath = SEEDPATH + "\\MOCK_DATA.xlsx";

                var workbook = WorkBook.Load(filePath);
                var worksheet = workbook.GetWorkSheet("data");
                var rowCount = worksheet.RowCount;

                using (context)
                {
                    for (int row = 2; row <= rowCount; row++)
                    {
                        postList.Add(new Post
                        {
                            Location = worksheet[$"A{row}:A{row}"].ToString(),
                            UserID = int.Parse(worksheet[$"B{row}:B{row}"].ToString()),
                            Title = worksheet[$"C{row}:C{row}"].ToString(),
                            Description = worksheet[$"D{row}:D{row}"].ToString(),
                            PetType = (PetType)int.Parse(worksheet[$"E{row}:E{row}"].ToString()),
                            StatusType = (StatusType)int.Parse(worksheet[$"F{row}:F{row}"].ToString())
                            
                        });
                    }


                    await context.Posts.AddRangeAsync(postList);
                    await context.SaveChangesAsync();
                }

            }
        }
    }
}
