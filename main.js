var http = require('http');
var fs = require('fs');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
app.listen(8081);

var userList = [];

function handler(request, response)
{
	fs.readFile(__dirname + "/index.html", function(err, data)
	{
		if (err)
		{
			response.writeHead("500", {'Content-Type': 'text/plain'});
			response.end("Internal server error loading page.");
		}
		else
		{
			response.writeHead("200", {'Content-Type': 'text/html'});
			response.end(data);
		}
	});
}

io.on('connection', function(socket)
{
//	console.log("New user registered!");
	userList.push(socket);
	socket.on('notification', function (data)
	{
		//console.log(data);
		if (data.message == undefined)
		{
//			console.log("New user message!");
			sendMessage("<span class='italics'>" + data.username.replace(/</g,"&lt;") + " has joined the chat!</span>", false);
		}
		else
		{
//			console.log("New user message!");
			sendMessage(data.username + ": " + data.message, true);
		}
	});
});

function sendMessage(text, check)
{
//	console.log(text);
	if (check)
	{
		text = text.trim().replace(/</g,"&lt;");
	}
	for (var i = 0; i < userList.length; i++)
	{
		if (userList[i].connected)
		{
			userList[i].emit('notification', text+"<br />\n");
		}
		else
		{
			userList.splice(i--, 1);
		}
	}
}
