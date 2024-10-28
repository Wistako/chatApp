
const app = () => {
  let userName = 'Gość';
  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  const socket = io({
    autoConnect: false
  });
  
  socket.on('message', ({ author, content }) => addMessage(author, content));
  
  const login = (e) => {
    e.preventDefault(); 
    const userNameInputValue = userNameInput.value;
    if(userNameInputValue === '' || userNameInputValue === 'ChatBot') {
      alert('Wpisz swoje imię');
    } else {
      userName = userNameInputValue;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
      socket.open();
      socket.emit('join', { user: userName });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const messageContent = messageContentInput.value;
    if(messageContent === '') {
      alert('Wpisz treść wiadomości');
    } else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent });
      messageContentInput.value = '';
    }
  };

  const addMessage = (author, content) => { 
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    if(author === 'ChatBot') message.classList.add('message--bot');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
    console.log('Wiadomość wysłana');
  };

  loginForm.addEventListener('submit', (e) => {
    login(e);
  });

  addMessageForm.addEventListener('submit', (e) => {
    sendMessage(e);
  });
};

app();
