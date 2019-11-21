var socket = io.connect("localhost:3000", function(){
    username: handle.value
});

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value || 'Anonymous'
     });
     message.value=null;
})


message.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

socket.on('chat', function(data){
    output.innerHTML += '<P> <strong>'+data.handle+ ': </strong>'+ data.message +'</p>'
    feedback.innerHTML =''
})

socket.on('typing', function(name){
    feedback.innerHTML = '<p><em>.... '+ name +' is typing.</em></p>'
})

// socket.on('typing', )