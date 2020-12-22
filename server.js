require('dotenv').config();
const express = require('express');
const socketio = require('socket.io');

const app = express();

require('./db/connectDB')();

app.use(express.json({ extended: false }));
app.use('/api', require('./api'));

if (process.env.NODE_ENV !== 'production') {
  const allowCrossDomain = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Cache-Control',
    );

    app.use(allowCrossDomain);
  };
}

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`1: Server has started on ${port}`),
);

const io = socketio(server, { cors: { origin: '*' } });

io.on('connect', (socket) => {
  console.log(`Client connected to socket`);
  socket.emit('start', 'Socket has started');
  socket.on('join', () => console.log('User has joined'));
});
