using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Comment Comment { get; set; }
        }
        

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            

            public Handler(DataContext context, IUserAccessor userAccessor )
            {
                
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                _context.Comments.Add(request.Comment);
                var result = await _context.SaveChangesAsync() > 0;

                if(!result)
                    return Result<Unit>.Failure("Failed to create comment");

                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}