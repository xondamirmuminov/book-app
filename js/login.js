
let bookForm = document.getElementById('login');

function login(event) {
  event.preventDefault();

  const bookForm = document.getElementById('login');
  const { email, password } = bookForm;
  const user = {
    email: email.value,
    password: password.value,
  };
  console.log(user);

  fetch("https://book.alitechbot.uz/api/login", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
    redirect: 'follow'
  }).then(response => response.json())
    .then(result => {
      console.log(result.success)
      if (result.success) {
        confirm('Hatolik yo\'q')

        localStorage.setItem('token', result.token);
        window.location.pathname = './index.html'

      } else {
        confirm('Hatolik')
      }
    })
    .catch(error => console.log('error', error));
}