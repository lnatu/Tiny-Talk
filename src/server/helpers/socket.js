exports.pushClientsSocketId = (clients, userId, socketId) => {
  if (clients[userId]) {
    clients[userId].push(socketId);
  } else {
    clients[userId] = [socketId];
  }
};

exports.clearClientsSocketId = (clients, userId, socketId) => {
  clients[userId] = clients[userId].filter(item => item !== socketId);

  if (clients[userId].length === 0) {
    delete clients[userId];
  }
};

const responseToClients = (clients, userId, io, eventName, data) => {
  clients[userId].forEach(socketId =>
    io.sockets.connected[socketId].emit(eventName, data)
  );
};

exports.responseToClients = responseToClients;

exports.openFriendRequest = (io, socket, clients, eventName) => {
  socket.on(eventName, clientData => {
    /* const { id, fullName, avatar } = socket.request.user;
    const sender = {
      id,
      fullName,
      avatar
    }; */

    if (clients[clientData.contactId]) {
      responseToClients(
        clients,
        clientData.contactId,
        io,
        'friend-request-on-response',
        {
          notification: clientData.notification
        }
      );
    }
  });
};

exports.closeFriendRequest = (io, socket, clients, eventName) => {
  socket.on(eventName, clientData => {
    const { id } = socket.request.user;
    const currentUser = {
      id
    };

    if (clients[clientData.contactId]) {
      responseToClients(
        clients,
        clientData.contactId,
        io,
        'friend-request-off-response',
        { currentUser, notificationId: clientData.notificationId }
      );
    }
  });
};
