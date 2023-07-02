const socket = io.connect('http://localhost:8080')

var message = document.getElementById('message'),
  user = document.getElementById('name'),
  send = document.getElementById('send'),
  output = document.getElementById('output'),
  line = document.getElementById('typing');



  socket.on('activeUsers', (count) => {
    document.getElementById('activeUsers').innerText = `Active Users: ${count}`;
    console.log(count);
  });
  
  
  
  
  
  
  

send.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    user: user.value
  })
  message.value = ""
})

socket.on('chat', function (data) {
  if(data.user == user.value){
    output.innerHTML += `<p class="activeuser"><span >${data.user}</span> ${data.message}</p><br>`
  }
  else{
    output.innerHTML += `<p class ="user2"><span class="username">${data.user}</span> ${data.message}</p>`

  }
  line.innerHTML = ""
})

message.addEventListener('keypress', () => {
  socket.emit('typing', user.value)
})

socket.on('typing', function (user) {
  line.innerHTML = `<p><em>${user} is typing.....</em></p>`
})