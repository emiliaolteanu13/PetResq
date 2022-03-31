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

namespace Application.ProfilePhotos
{
    public class Details
    {
        public class Query : IRequest<Result<ProfilePhoto>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProfilePhoto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<ProfilePhoto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photo = await _context.ProfilePhotos.Where(p => p.Username == request.Username).FirstOrDefaultAsync(cancellationToken: cancellationToken);
                return Result<ProfilePhoto>.Success(photo);
            }
        }
    }
}
