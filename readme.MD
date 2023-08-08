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

---

Part of the room system logic. It actually more complicated though.
![Room logic](http://www.plantuml.com/plantuml/png/ZLFHZjGm37plLvWJ4bs9WtU4uFu3yP1hl6rqZLrYPnV-dgR18aUaNTvsxPcnFPC-YRgaEQx36rqm8aIdc88Ric1w_09NVDxSZF09U4E2ydkmsjuczgKdFBsWVWWC4nFXf87fK81EGXe8HAJSoq5YZj--Gy8V6KK_IduMOB9othnJbA60N-iBafS_i5QsR5BQ2r_5siESE6yGtKkW-IZs2x_gMlNpZjWG4rYx_dFaOKPLAmJV7rO8UAZPRN0Dki32eky4l5CtLkvxG9rEvSGoqEZEUwbqPRkZT-6jv6b2aV5XIkWKA-NXTDEH0ScR9nOGpJQdjwO3tNLe36UWlAwd_xFA32hApPCPtIfSWwupWZziQgZsG2erq9blFPMA60DDQ_POHGNu36vT3vkaCSxkQZskgqbn0I-OVXsacci1Dxll4Mpuhuyb-qgPmmK5bY0mEReukPdNOM8zr1k-YT07QG8w9uu7QvJLNH0uGNIYcBwU-cGRxb_YlO2CKyviNcqNnqXujTdm219tbuj888y_UwFxPNPyZUZEzmsZZHKDEuVfTFZpXEHpN7y3)

---

#### How to run this
1. Clone repo 
2. Install dependencies for frontend and backend, then run both projects using npm, yarn or any other packet manager