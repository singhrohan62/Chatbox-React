var app = require('express')();

var http = require('http').createServer(app);

var io = require('socket.io')(http);

var users = {};

var usernames = [];

var user_name = '';

/*app.get('/', function (req, res) {
	res.sendFile(__dirname + '/login.html');
});*/

io.on('connection', function (socket) {
	console.log('connected');

	socket.on('Login User',function (username) {
		user_name = username;
		users[socket.id] = username;
		usernames.push(username);
		console.log('user when logged in : '+ user_name);
		console.log(users);
		io.sockets.emit('Users Connected',usernames,socket.id);
	});

	socket.on('Chat Message', function (msg,username) {
		console.log('username passed : '+ users[socket.id]);
		console.log(users);
		console.log(socket.id);
		console.log(users[socket.id]);
		user_name = users[socket.id];
		console.log(users[socket.id]+' texts : '+msg);
		io.sockets.emit('Chat Message Show', msg, users[socket.id]);
		// io.emit('Chat Message', msg, user_name);
	});

	socket.on('disconnect',function () {

		console.log('user disconnected '+users[socket.id]);
	});
});

http.listen(4001, function () {
	console.log('listening on port: 4001');
});