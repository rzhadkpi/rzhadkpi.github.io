function validateForm() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var button = document.querySelector('.contact_form__button');

    button.disabled = !(fullName && email && subject);
}

function submitForm() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;

    var user = { fullName, email, subject };
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    displayRandomUser(user);
    document.getElementById('userForm').reset();
    document.querySelector('.contact_form__button').disabled = true;
}

function displayRandomUser(lastUser) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length > 1) {
        var randomIndex = Math.floor(Math.random() * (users.length - 1));
        var user = users[randomIndex];

        if (user == lastUser && users.length > 1) {
            displayRandomUser(lastUser);
        } else {
            alert('Name: ' + user.fullName + '\nEmail: ' + user.email + '\nSubject: ' + user.subject);
        }
    } else {
        alert('Ми надішлемо вашого подопічного згодом.');
    }
}