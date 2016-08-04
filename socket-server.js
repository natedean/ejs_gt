'use strict';

const io = require('./app').io;

const createNewRoom = (playerId) => ({
  id: Math.ceil(Math.random() * 10),
  players: []
});

const isVacancies = (rooms) => rooms.filter(x => x.players.length < 2).length > 0;

const addRoomIfNecessary = (rooms, playerId) => {
  if (rooms.length && isVacancies(rooms)) { return rooms; }

  return rooms.concat([createNewRoom(playerId)]);
};

const addPlayer = (rooms, roomId, playerId) => {
  return rooms.map((x) => {
    if (x.id !== roomId) { return x; }

    const y = Object.assign({}, x, { players: x.players.concat([playerId]) });

    return y;
  });
};

const findAvailableRoomId = (rooms) => rooms.filter(x => x.players.length < 2)[0].id;

let rooms = [];

io.on('connection', function (socket) {
  // somehow we need to get the current connecting player's id... no idea
  const playerId = socket.client.id;

  rooms = addRoomIfNecessary(rooms);

  let roomId = findAvailableRoomId(rooms);

  rooms = addPlayer(rooms, roomId, playerId);

  socket.join(roomId);

  socket.emit('joinedRoom', rooms.find((x) => x.id === roomId));

  socket.to(roomId).emit('news', { hello: `hello room ${roomId}` });

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnect', () => console.log(`disconnected from ${roomId}`));
});