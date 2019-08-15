const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');



const routes = require('./routes');



const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;


});

mongoose.connect('mongodb+srv://rvs:123rvs10@cluster0-9pbft.mongodb.net/omnistack8?retryWrites=true&w=majority', {

    userNewUrlParser: true,
});
console.log("Banco MongoDB conectado com sucesso")

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

   return next();
});
          
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3000);
