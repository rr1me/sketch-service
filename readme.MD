# Multiplayer mouse-drawing app for sketching.

### Frontend:

> - React with Typescript
> - SASS with hashed styles
> - Redux Toolkit
> - Socket.IO
> - PeerJS
> - Simplebar-React
> - React-Colorful

### Backend:
> - Node.js
> - Nest.js
> - Socket.IO
> - PeerJS

This is MP drawing app based on 2D canvas with history, WebRTC(PeerJS) + WebSocket(Socket.IO) network connection and custom notification system with queue. Network system using room pattern, and it's limited to 5 slots per room. It is available to kick, reduce slots, close room with password, etc. All frontend is animated with sliding animations.

![Basics preview](https://cdn.discordapp.com/attachments/1110628700631863300/1113964872867254282/Screenshot_4.png)

![Multiplayer preview](https://cdn.discordapp.com/attachments/1110628700631863300/1113964873181831318/Screenshot_5.png)

#### How to run this
1. Clone repo 
2. Install dependencies for frontend and backend, then run both projects using npm, yarn or any other packet manager