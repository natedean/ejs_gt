'use strict';

const io = require('./app').io;
const uuid = require('node-uuid');

const createNewRoom = (playerId) => ({
  id: uuid.v4(),
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

    return Object.assign({}, x, { players: x.players.concat([playerId]) });
  });
};

const findAvailableRoomId = (rooms) => rooms.filter(x => x.players.length < 2)[0].id;

let rooms = [];

io.on('connection', function (socket) {
  const playerId = socket.client.id; // this really needs to pass the players mongo uid if available

  // if there are no empty rooms, add a room.
  rooms = addRoomIfNecessary(rooms);

  // find the first available room id
  let roomId = findAvailableRoomId(rooms);

  // add player to the first available room
  rooms = addPlayer(rooms, roomId, playerId);

  const myRoom = rooms.find(x => x.id === roomId);

  // socket, join room
  socket.join(roomId);

  socket.on('answerEvent', (data) => {



    socket.emit('answerEvent', myRoom); // the client will optimistically update, but then we need to sync up just in case
    socket.to(roomId).emit('answerEvent', myRoom); // notify the room!
  });

  // start game, if able
  if (myRoom.players.length === 2) {
    socket.emit('startGame', myRoom); // tell me to startGame
    socket.to(roomId).emit('startGame', myRoom); // tell others in room to startGame
  }

  socket.on('disconnect', () => console.log(`disconnected from ${roomId}`));
});