
const app = () => {
  let userName = 'Gość';
  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');
  
  const login = (e) => {
    e.preventDefault(); 
    const userNameInputValue = userNameInput.value;
    if(userNameInputValue === '') {
      alert('Wpisz swoje imię');
    } else {
      userName = userNameInputValue;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if(messageContentInput.value === '') {
      alert('Wpisz treść wiadomości');
    } else {
      addMessage(userName, messageContentInput.value);
      messageContentInput.value = '';
    }
  };

  const addMessage = (author, content) => { 
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
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
