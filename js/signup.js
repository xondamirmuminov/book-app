var firstName = document.getElementById("form__fname");
var lastName = document.getElementById("form__lname");
var email = document.getElementById("form__email");
var password = document.getElementById("form__password");

function sign(e){
    e.preventDefault();
    const user = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
  console.log(user);
    fetch('http://book.alitechbot.uz/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then(res => console.log(res))
  }