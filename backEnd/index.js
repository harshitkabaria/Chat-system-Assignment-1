let express = require('express')
let app = express();
let http = require('http');
let httpServer = http.Server(app);
let socketIO = require('socket.io');

const users = require("./userdata.json");
const groups = require("./groupdata.json");
const channels = require("./channeldata.json");

const remove  = require("lodash/remove");
let io = socketIO(httpServer,{
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});
let fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
const { group } = require('console');

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const sockets = require("./socket.js")(app, io);

app.use(cors()); // Add cors middleware to the express application

// Start server, listen to port 3000 and log host, port and date
let server = httpServer.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    var date = new Date();
    console.log("Server listening on: " + host + " port: " + port + " At: " + date);
});



app.post('/api/auth', (req, res) => {
	var uname = req.body.username;
	var uemail = req.body.email;
	var urole;
	var userObj;
	console.log(uname);
	console.log(uemail);

	fs.readFile('userdata.json', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			res.send({
				'username': '',
				'success': false
			});
		} else {
			userObj = JSON.parse(data);
			for (let i = 0; i < userObj.length; i++) {
				if (userObj[i].name == uname) {
						console.log(userObj);
							urole = userObj[i].role;
							console.log("urole",urole);
							uId=userObj[i].id;
							res.send({
								'id':uId,
								'username': uname,
								'email': uemail,
								'role': urole,
								'success': true
							});
							console.log(urole);
							return;
						
					
				}
			}
			res.send({
				'username': uname,
				'success': false
			});
		}
	});
});


app.post('/api/userRegistration', (req, res) => {
	var isUser = 0;
	var regUserObj;
	var regUname = req.body.username;
	var regUemail = req.body.email;
	var regUrole = req.body.role;
	console.log(regUname)

	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			regUserObj = JSON.parse(data);

			for (let i = 0; i < regUserObj.length; i++) {
				if (regUserObj[i].name == regUname || regUserObj[i].email == regUemail) {
					isUser = 1;
				}
			}

			if (isUser > 0) {
				console.log(req.body);
				res.send({
					'username': '',
					'success': false
				});
			} else {
				regUserObj.push({
					'name': regUname,
					'email': regUemail,
					'role': regUrole
				})
				var newdata = JSON.stringify(regUserObj);
				fs.writeFile('userdata.json', newdata, 'utf-8', function(err) {
					if (err) throw err;
					res.send({
						'username': regUname,
						'email': regUemail,
						'role': regUrole,
						'success': true
					});
				});
			}
		}
	});
});

app.get('/api/getAllUsers', (req, res) => {
	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var userData = JSON.parse(data);
			res.send({
				userData
			});
		}
	});
});

app.delete('/api/users/:userId', (req, res) => {
	remove(users, user => user.id === parseInt(req.params.userId));
	res.json({});
  });

app.post('/api/addGroup', (req, res) => {
	var isGroup = 0;
	var regGroupObj;
	var regGname = req.body.name;
	console.log("GroupName",regGname);
	fs.readFile('groupdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			regGroupObj = JSON.parse(data);

			for (let f = 0; f < regGroupObj.length; f++) {
				if (regGroupObj[f].name == regGname) {
					isGroup = 1;
				}
			}
			if (isGroup > 0) {
				console.log(req.body);
				res.send({
					'name': '',
					'success': false
				});
			} else {
				regGroupObj.push({
					'name': regGname,
					id: groups.length + 1,
					name: regGname,
					channels: [],
					users: [],
					assis: [],
				})
				var newGroupData = JSON.stringify(regGroupObj);
				fs.writeFile('groupdata.json', newGroupData, 'utf-8', function(err) {
					if (err) throw err;
					console.log(newGroupData)
					res.json(newGroupData);
				});
			}
		}
	});
});

app.post('/api/groups', (req, res) => {
	const group = { 
	  id: groups.length + 1,
	  name: req.body.name,
	  channels: [],
	  users: [],
	  assis: [],
	};
	res.json(group);
  });
  
  app.get('/api/groups', (req, res) => {
	res.json(groups);
  });

  app.delete('/api/groups/:id', (req, res) => {
	const id = req.params.id;
	console.log("groupID",req.params,groups);
	remove(groups, item => {item.id === id;console.log(item.id,id)});
	console.log("after",groups)
	res.json({});
  });

  app.get('/api/channels', (req, res) => {
	res.json(channels);
  });

  app.get('/api/groups/user/:userId', (req, res) => {
	console.log(req.params);
	const userId = parseInt(req.params.userId);
	const myGroups = groups.filter(item => {
	  return item.users.findIndex(id => id === userId) > -1;
	});
	res.json(myGroups);
  });

  app.post('/api/inviteUser', (req, res) => {
	  console.log(req.body);
	const user = users.find(item => item.name === req.body.name);
	const ret = {};
	console.log(req.body.channelId.id)
	const channel = channels[req.body.channelId.id - 1];
	if (user) {
	  channel.users.push(user)
	} else {
	  let newUser = {
		id: users.length + 1,
		name : req.body.name,
		//email: req.body.email,
		role: 1,
	  };
	  users.push(newUser);
	  ret.user = newUser;
	  console.log(channel)
	  channel.users.push(newUser)
	}
	ret.channel = channel;
  
	res.json(ret);
  });

  app.put('/api/channels/:channelId', (req, res) => {
	const channelId = parseInt(req.params.channelId);
	const userId = req.body.userId;
	channels[channelId - 1].users.push(userId);
	res.json(channels[channelId - 1]);
  });
  
  app.get('/api/channels/:channelId/users/:userId', (req, res) => {
	const channelId = parseInt(req.params.channelId);
	const userId = parseInt(req.params.userId);
	let c = channels[channelId-1].users;
	let chaneluser = channels[channelId-1].users[userId-1] || [];
	console.log(c)
	console.log(chaneluser)
	const index = c.findIndex((chaneluser) => chaneluser == userId);
	console.log(index)
	if (index > -1) {
		console.log(index);
		console.log(chaneluser);
		c.splice(index, 1);
		console.log(c);
        channels[channelId-1].users = c; 
	
		res.json(
			channels[channelId - 1]
		);
	  } else {
		res.json({
		  success: false,
		});
	  }
//	remove(channels[channelId].users, item => item === userId);
	
	//res.json(channels[channelId - 1]);
  });



  app.put('/api/users/:id', (req, res) => {
	const role = req.body.role;
	const user = users[req.params.id - 1];
	user.role = role;
	res.json(user);
  });

  app.get('/api/users', (req, res) => {
	res.json(users);
  });
  
  app.post('/api/group/:groupId/channel', (req, res) => {
	var isChannel = 0;
	var regChannelObj=[];
	const groupId = parseInt(req.params.groupId);
	console.log()
	console.log(req.body);
	const channel = {
	  id: channels.length + 1,
	  group: groupId,
	  name: req.body.name,
	  user: [],
	};

//	let channelGroup=JSON.stringify(channel);

	fs.readFile('channeldata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			regChannelObj = JSON.parse(data);

			console.log(regChannelObj);

			for (let f = 0; f < regChannelObj.length; f++) {
				if (regChannelObj[f].name == req.body.name) {
					isChannel = 1;
				}
			}
			if (isChannel > 0) {
				console.log(req.body);
				res.send({
					'name': '',
					'success': false
				});
			} else {
				regChannelObj.push(channel)
			}
	fs.writeFile('channeldata.json', JSON.stringify(regChannelObj), 'utf-8', function(err) {
		if (err) throw err;
		console.log(channelGroup)
		res.json(regChannelObj);
	});
//	channels.push(channel);
	return res.json(channel);
  }});

  app.post("/api/createChannel", function (req, res) {
	console.log("creating channel...");
  
	var newChannel = {
	  id: newCid++,
	  groupId: req.body.groupId,
	  name: req.body.channelName,
	  users: [],
	  messages: [],
	};

	
  
  
	res.json({
	  success: true,
	  newChannel: newChannel,
	});
  })});