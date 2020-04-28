using System;

namespace TestProject.Data.Models
{
    public class ChatMessage
    {
        public string SenderName { get; set; }

        public string Text { get; set; }

        public DateTimeOffset SentAt { get; set; }
    }
}
