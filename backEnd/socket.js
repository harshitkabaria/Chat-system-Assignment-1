module.exports = function(app, io) {
    console.log("server socket initiated");
  
    io.on('connection', (socket) => {
      console.log('user connection');
  
      socket.on('disconnection', function() {
        console.log('user disconnection');
      });
  
      //Function needs to be specified as add-message to send
      socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
       });
    });
  };
  