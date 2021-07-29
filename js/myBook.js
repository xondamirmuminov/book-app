let bookList = document.getElementById('book-list');
let bookInner = document.getElementById('myabout__inner-card');
var book;

fetch('https://book.alitechbot.uz/api/books/my-books', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(res => res.json())
    .then(data => {
        book = data.payload.docs;
        data.payload.forEach(item => {
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