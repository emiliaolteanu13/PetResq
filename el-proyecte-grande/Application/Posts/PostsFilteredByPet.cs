using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Posts
{
    public class PostsFilteredByPet
    {
        public class Query : IRequest<Result<List<Post>>>
        {
            public string Pet { get; set; }
        }



        public class Handler : IRequestHandler<Query, Result<List<Post>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Post>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Post>>.Success(await _context.Posts.Where(post => post.PetType.ToUpper() == request.Pet.ToUpper()).ToListAsync(cancellationToken));
            }
        }
    }
}
