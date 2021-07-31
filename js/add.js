var select = document.getElementById("form__select");

fetch('http://book.alitechbot.uz/api/authors')
  .then(res => res.json())
  .then(data => {
    data.payload.forEach(item => {
      let option1 = `
    <option value=${item._id}>${item.firstName}</option>
    `
      select.innerHTML += option1;
    });
  })

function addBook(e) {
  e.preventDefault();
  var title = document.getElementById("form__title");
  var price = document.getElementById("form__price");
  var pages = document.getElementById("form__page");
  var imageLink = document.getElementById("form__img");
  var country = document.getElementById("form__country");
  var year = document.getElementById("form__year");
  var select = document.getElementById("form__select");
  var description = document.getElementById("form__description");

  console.log(imageLink.files[0])
  let formData = new FormData();
  formData.append("title", title.value)
  formData.append("price", price.value)
  formData.append("pages", pages.value)
  formData.append("image", imageLink.files[0])
  formData.append("country", country.value)
  formData.append("year", year.value)
  formData.append("author", select.value)
  formData.append("description", description.value)
  fetch('https://book.alitechbot.uz/api/books', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: formData,
    redirect: 'follow'
  }).then(response => response.json())
    .then(result => {
      console.log(result);
      if (result) {
        confirm('Siz taqdim qilgan kitob yaratildi');
      } else {
        confirm('Hatolik');
      }
    })
    .catch(error => console.log('error', error))
  console.log(Array.from(formData));
}

var firstName = document.getElementById("form__firstName");
var lastName = document.getElementById("form__lastName");

function addAuthor(e) {
  e.preventDefault();
  const author = {
    firstName: firstName.value,
    lastName: lastName.value,
  }

  fetch('https://book.alitechbot.uz/api/authors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(author),
    redirect: 'follow'
  }).then(response => response.json())
    .then(result => {
      if (result.success) {
        confirm('Siz taqdim qilgan author yaratildi');
      } else {
        confirm('Hatolik');
      }
    })
    .catch(error => console.log('error', error))
}

