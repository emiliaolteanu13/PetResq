using System;

namespace Domain
{
    public class Comment
    {
        public Guid ID { get; set; }
        public string Text{ get; set; }
        public Guid PostId{ get; set; }
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public DateTime Date {get;set;}
    }
}