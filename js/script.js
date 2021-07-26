let bookList = document.getElementById('book-list');
let bookInner = document.getElementById('about__inner-card');
var book;

fetch('https://book.alitechbot.uz/api/books')
    .then(res => res.json())
    .then(data => {
        book = data.payload.docs;
        data.payload.docs.forEach(item => {
            let imageFinalLink = `https://book.alitechbot.uz/${item.imageLink}`
            if (item.imageLink.startsWith('https')) {
                imageFinalLink = item.imageLink
            }
            bookInner.innerHTML += `
            <div id="${item._id}" class="about__card">
                <img class="about__card-img" src="${imageFinalLink}"/>
                <h3 class="about__card-title">${item.title}</h3>
                <p class=""about__card-text>${item.year}</p>
                <button onclick="getBook(this)" class="about__card-btn">more</button>
                <div class="about__card-inner-btn">
                    <button onclick="deleteBook(this)" class="about__card-del-btn">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    <button onclick="editBook(this)" class="about__card-edit-btn">
                        <i class="fas fa-pen"></i>
                    </button
                </div>
             </div>`
        });
    })

console.log(book)

function deleteBook(e) {
    e.parentElement.parentElement.remove();
    let bookId = e.parentElement.parentElement.id;
    console.log(bookId);
    fetch(`https://book.alitechbot.uz/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        redirect: 'follow'
    }).then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.success) {
                confirm('Siz tanlagan kitob o\'chirildi');
            } else {
                confirm('Uzur hatolik yuz berdi');
            }
        })
        .catch(error => console.log('error', error))
}

let bookId;

let title = document.getElementById('edit-title');
let price = document.getElementById('edit-price');
let pages = document.getElementById('edit-pages');
let imageLink = document.getElementById('edit-imageLink');
let year = document.getElementById('edit-year');

function editBook(e) {
    bookId = e.parentElement.parentElement.id;
    let modal = document.getElementById('editmodal');
    fetch(`https://book.alitechbot.uz/api/books/${bookId}`)
        .then(res => res.json())
        .then(data => {
            title.value = data.payload.book.title;
            price.value = data.payload.book.price;
            pages.value = data.payload.book.pages;
            imageLink.value = data.payload.book.imageLink;
            year.value = data.payload.book.year;
        })
    modal.style.display = 'block';
}

function updateBook(e) {
    e.preventDefault();
    let editBookUpdate = {
        title: title.value,
        pages: pages.value,
        year: year.value,
        imageLink: imageLink.value,
        price: price.value
    }
    console.log(bookId);
    fetch(`https://book.alitechbot.uz/api/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        redirect: 'follow',
        body: JSON.stringify(editBookUpdate)
    }).then(response => response.json())
        .then(result => {
            if (result.success) {
                window.location.pathname = 'index.html';
            } else {
                confirm('Uzur hatolik yuz berdi');
            }
        })
        .catch(error => console.log('error', error))
}

function getBook(event) {
    let bookIdTwo = event.parentElement.id;
    console.log(bookIdTwo)
    localStorage.setItem('bookId', JSON.stringify(bookIdTwo))
    if (localStorage.bookId) {
        window.location.pathname = 'book.html';
    }
}

function searchBook(event) {
    event.preventDefault();
    let input = document.getElementById('home-inp');
    fetch('https://book.alitechbot.uz/api/books')
        .then(res => res.json())
        .then(data => {
            let filterBook = data.payload.docs.filter(item => item.title.toLowerCase().includes(input.value) ? true : false);
            bookInner.innerHTML = '';
            filterBook.forEach(item => {
                let card = `
                <div id="${item._id}" class="about__card" onclick="takeId(this)">
                    <img class="about__card-img" src="${item.imageLink}"/>
                    <h3 class="about__card-title">${item.title}</h3>
                    <p class=""about__card-text>${item.year}</p>
                    <button onclick="getBook()" class="about__card-btn">more</button>
                    <button onclick="deleteBook(this)" class="about__card-del-btn">
                        <i class="far fa-trash-alt"></i>
                    </button
                </div>
                `
                bookInner.innerHTML = card;
            })
        })
}