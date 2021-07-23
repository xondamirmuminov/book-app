function signUp(e) {
    e.preventDefault();
    const bookForm = document.getElementById('form');
    const { email, password, firstName, lastName } = bookForm;
    const user = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value
    };

    fetch("https://book.alitechbot.uz/api/sign-up", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    }).then(response => response.json())
        .then(result => {
            console.log(result.msg);
            if (result.success) {
                confirm('Your are logged in successfully')
                localStorage.setItem('token', JSON.stringify(result.token));
                window.location.pathname = './login.html'
            } else {
                confirm('Hatolik')
            }
        })
        .catch(error => console.log('error', error));
}