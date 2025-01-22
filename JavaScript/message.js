const notificationDiv = document.getElementById('notification-div');
const notificationText = document.getElementById('notification-text');
const notificationButton = document.getElementById('notification-btn');

function deleteMessage() {
    notificationText.textContent = '';
    notificationDiv.style.height = '0px';
    notificationButton.style.display = 'none';
    notificationText.style.display = 'none';
}

function showMessage(message) {
    notificationText.textContent = message;
    notificationDiv.style.height = '50px';
    setTimeout(()=> {
        notificationButton.style.display = 'block';
        notificationText.style.display = 'block';
    }, 100);    
}

notificationButton.addEventListener('click', () => deleteMessage());