const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const socket = require('socket.io');
const connectFlash = require('connect-flash');
const db = require('./config/keys');

//init app
const app = express();

db.authenticate()
	.then(()=>console.log('connected'))
	.catch(err=>console.log(err))


//setup bodyParser 
app.use(bodyParser.urlencoded({ extended: false }))

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({
	defaultLayout:'layout', 
	helpers: {
		count: function(n, block) {
				var accum = '';
				for(var i = 0; i < n; ++i)
					accum += block.fn(i);
				return accum;
			}
		}
	}
));


app.set('view engine', 'handlebars');

//setup cookie parser 
app.use(cookieParser());


//Express Session
app.use(expressSession({
	secret: 'secret',
	saveUninitialized: true,
	resave:true
}));


//setup passport
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(connectFlash());

//setup public folder
app.use(express.static('public'));

//start server
const server = app.listen(3000, ()=> console.log('server started on port 3000'));

// //setup socket
const io = socket(server);

const chatmates = {};

io.on('connection', (socket)=>{
	// console.log("Socket connected. Socked id: ", socket.id);
	// console.log("Socket object: ",socket)
	
	socket.on('SEND_USERNAME', data=>{
		// console.log('Username: ', data.username)
		chatmates[data.user_id] = socket.id
	})
	
	//global chat
    socket.on('chat', data=>{
        io.sockets.emit('chat', data);
	});
	

	//private_chat
	socket.on('private', data=>{
		console.log('private called backend ')
		socket.to(chatmates[data.to_id]).emit('private', data);
		// socket.to(socket.id).emit('self', data);
		console.log(data)
	});

	socket.on('self', data=>{
		socket.to(socket.id).emit('self', data);
	})

    socket.on('typing', data=>{        
        socket.broadcast.emit('typing', data);
	});

	socket.on('privatetyping', data=>{
		io.to()
	})
	
	// socket.on('disconnect', ()=>{
	// 	console.log(socket.id, )
	// })
});

//setup routes
app.use('/', require('./routes/greet'));
app.use('/signup', require('./routes/signup'));
app.use('/home', require('./routes/home'));
app.use('/chatglobal', require('./routes/chatglobal'));
app.use('/chatprivate', require('./routes/chatprivate'));