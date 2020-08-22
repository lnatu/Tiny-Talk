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
    const { id } = socket.request.user;

    if (clients[clientData.contactId]) {
      responseToClients(
        clients,
        clientData.contactId,
        io,
        'friend-request-on-response',
        {
          currentUser: id,
          notification: clientData.notification
        }
      );
    }
  });
};

exports.closeFriendRequest = (io, socket, clients, eventName) => {
  socket.on(eventName, clientData => {
    const { id } = socket.request.user;

    if (clients[clientData.contactId]) {
      responseToClients(
        clients,
        clientData.contactId,
        io,
        'friend-request-off-response',
        { currentUser: id, notificationId: clientData.notificationId }
      );
    }
  });
};

exports.acceptFriendRequest = (io, socket, clients, eventName) => {
  socket.on(eventName, clientData => {
    const { id } = socket.request.user;

    if (clients[clientData.contactId]) {
      responseToClients(
        clients,
        clientData.contactId,
        io,
        'friend-request-accepted-response',
        {
          currentUser: id,
          notificationId: clientData.notificationId,
          contact: clientData.contact,
          conversation: clientData.conversation
        }
      );
    }
  });
};
