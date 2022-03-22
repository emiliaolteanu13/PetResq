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

namespace Application.PetPhotos
{
    public class List
    {
        public class Query : IRequest<Result<List<PetPhoto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PetPhoto>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<PetPhoto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<PetPhoto>>.Success(await _context.PetPhotos.ToListAsync(cancellationToken));
            }
        }
    }
}
