let home = document.getElementById('home__inner');
let bookParse = JSON.parse(localStorage.getItem('book'));

console.log(bookParse)
let imageFinalLink = `https://book.alitechbot.uz/${bookParse.book.imageLink}`
if (bookParse.book.imageLink.startsWith('https')) {
    imageFinalLink = bookParse.imageLink
}
home.innerHTML += `
<div class="home__card" id=${bookParse.book._id}>
<div class="home__card-block">
            <img class="home__card-img" src="${imageFinalLink}"/>
            </div>
            <div class="home__card-block">
            <div class="home__card-block-inner">
            <h1 class="home__card-title">${bookParse.book.title} (${bookParse.book.year})</h1>
            </div>
            <a href="#" class="home__card-author"><img class="home__card-title-img" src="./img/fountain-pen-close-up.svg"/> By : ${bookParse.book.author.firstName}</a>
            <p class="home__card-lang"><img class="home__card-title-img" src="./img/global.svg"/> Language : ${bookParse.book.language}</p>
            <p class="home__card-count"><img class="home__card-title-img" src="./img/placeholder.svg"/> Country : ${bookParse.book.country}</p>
            <p class="home__card-page"><img class="home__card-title-img" src="./img/open-book.svg"/> Pages : ${bookParse.book.pages}</p>
            <input type="text" id="home__card-inp"/>
            <button id="home__card-btn" onclick="sendComment(this,event)">📤</button>
        </div>
        </div>
        <div>
            ${bookParse.book.description}
        </div>
        <div>
        </div>
    `;

bookParse.comment.forEach(item => {
    let comment = `
        <div id="comment-inner">${item.text}</div>
    `
    home.innerHTML += comment;
})

let inpValue = document.getElementById('home__card-inp');
let commentInner = document.getElementById('comment-inner');

function sendComment(e, event) {
    event.preventDefault();
    let bookId2 = e.parentElement.parentElement.id;
    fetch('https://book.alitechbot.uz/api/books/comment', {
        method: "POST",
        body: JSON.stringify({
            bookId: bookId2,
            text: inpValue.value
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token} `
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.payload);
            localStorage.setItem('comment', JSON.stringify(data.payload))
            let text = `
             <p> ${data.payload.text}</p>
        `
            commentInner.innerHTML += text;
        })
}


console.log(bookParse);