var io = require('socket.io').listen(8080);
clients = [];
io.on('connection', function(socket) {
	console.log("heyDude");
	clients.push(socket);
	socket.on('video.play', function(){
		for (var i in clients){
			clients[i].emit('video.play.io', {});
			console.log("recieved video.play")
			console.log("emitted video.play.io")
		};
	});
	socket.on('video.pause', function(){
		for (var i in clients){
			clients[i].emit('video.pause.io', {});
			console.log("recieved video.pause");
			console.log("sent video.pause.io");
		};
	});
	// socket.on('video.seeking', function(parameters){
	// 	for (var i in clients){
	// 		clients[i].emit('video.seeking.io', {parameters});
	// 		console.log("recieved video.seeking");
	// 		console.log("send video.seeking.io");
	// 	};
	// });
	socket.on('video.seeking', function(parameters){
		for (var i in clients){
			clients[i].emit("video.seeking.io", parameters);
			console.log("recieved video.seeking");
			console.log("sent video.seeking.io");
		};	
	});

	socket.on('disconnect', function(){
		console.log("byeDude")
		clients.splice(clients.indexOf(socket),1);
	});
});