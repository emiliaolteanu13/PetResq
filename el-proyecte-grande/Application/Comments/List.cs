using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<Comment>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Comment>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Comment>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Comment>>.Success(await _context.Comments.ToListAsync(cancellationToken));
            }
        }
    }
}