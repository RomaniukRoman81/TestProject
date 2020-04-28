using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using TestProject.Data.Models;
using TestProject.Services;

namespace TestProject.API
{
    public class ChatHub : Hub
    {
        private readonly IChatRoomService _chatRoomService;

        public ChatHub(IChatRoomService chatRoomService)
        {
            _chatRoomService = chatRoomService;
        }

        public override async Task OnConnectedAsync()
        {
            var roomId = await _chatRoomService.CreateRoom(Context.ConnectionId);

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());

            await Clients.Caller.SendAsync(
                "ReciveMessage",
                "Test project",
                DateTimeOffset.Now,
                "Hello! What can we help you with toda?");

            await base.OnConnectedAsync();
        }

        public async Task SendMessage(string name, string text)
        {
            var roomId = await _chatRoomService.GetRoomForConnectionId(Context.ConnectionId);

            var message = new ChatMessage
            {
                SenderName = name,
                Text = text,
                SentAt = DateTimeOffset.Now
            };

            // broadcast to group clients
            await Clients.Group(roomId.ToString()).SendAsync(
                "ReceiveMessadge",
                message.SenderName,
                message.Text,
                message.SentAt);
        }
    }
}
