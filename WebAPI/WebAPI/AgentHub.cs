using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using TestProject.Data.Models;
using TestProject.Services;

namespace TestProject.API
{
    [Authorize]
    public class AgentHub : Hub
    {
        private readonly IChatRoomService _chatRoomService;
        private readonly IHubContext<ChatHub> _chatHub;

        public AgentHub(IChatRoomService chatRoomService, IHubContext<ChatHub> chatHub)
        {
            _chatRoomService = chatRoomService;
            _chatHub = chatHub;
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync(
                "ActiveRoom",
                await _chatRoomService.GetAllRooms());

            await base.OnConnectedAsync();
        }

        public async Task SentAgentMessage(Guid roomId, string text)
        {
            var message = new ChatMessage
            {
                SenderName = Context.User.Identity.Name,
                Text = text,
                SentAt = DateTimeOffset.Now
            };

            await _chatRoomService.AddMessage(roomId, message);

            await _chatHub.Clients.Group(roomId.ToString())
                .SendAsync("ReciveMessage",
                    message.SenderName,
                    message.Text,
                    message.SentAt);
        }

        public async Task LoadHistory(Guid roomId)
        {
            var history = await _chatRoomService.GetMessageHistory(roomId);

            await Clients.Caller.SendAsync("ReceiveMessages", history);
        }
    }
}
