using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ProfilePhotos
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ProfilePhoto ProfilePhoto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                _context.ProfilePhotos.Add(request.ProfilePhoto);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create photo");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
