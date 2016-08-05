'use strict';

const io = require('./app').io;
const uuid = require('node-uuid');
const Immutable = require('immutable');

let RoomsMap = Immutable.Map();

const createNewRoom = (playerId) => {
  let map = new Immutable.Map();

  map.set(playerId, createPlayer());

  return map;
};

const createPlayer = () => ({
  correctAnswers: 0,
  incorrectAnswers: 0
});

const hasVacancy = (RoomsMap) => RoomsMap.filter(x => x.size < 2).size > 0;

const addRoomIfNecessary = (RoomsMap, playerId) => {
  if (RoomsMap.size && hasVacancy(RoomsMap)) { return RoomsMap; }

  return RoomsMap.set(uuid.v4(), createNewRoom(playerId));
};

const findAvailableRoomId = (RoomsMap) => {
  return RoomsMap.findKey(x => x.size < 2);
};

io.on('connection', function (socket) {
  const playerId = socket.client.id; // this really needs to pass the players mongo uid if available

  // if there are no empty rooms, add a room.
  RoomsMap = addRoomIfNecessary(RoomsMap, playerId);

  // find the first available room id
  let roomId = findAvailableRoomId(RoomsMap);

  // add player to the first available room
  RoomsMap = RoomsMap.setIn([roomId, playerId], createPlayer());

  // socket, join room
  socket.join(roomId);

  socket.emit('joined', roomId);

  socket.on('answerEvent', (data) => {
    // update game object!

    socket.emit('answerEvent', myRoom); // the client will optimistically update, but then we need to sync up just in case
    socket.to(roomId).emit('answerEvent', myRoom); // notify the room!
  });

  // start game, if able
  if (RoomsMap.get(roomId).size === 2) {
    socket.emit('startGame', RoomsMap.get(roomId).toJS()); // tell me to startGame
    socket.to(roomId).emit('startGame', RoomsMap.get(roomId).toJS()); // tell others in room to startGame
  }

  socket.on('disconnect', () => console.log(`disconnected from ${roomId}`));
});