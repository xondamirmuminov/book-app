let home = document.getElementById('home__inner');
let parseId = JSON.parse(localStorage.getItem('bookId'));
const defaultImg = './img/image.png';

fetch(`https://book.alitechbot.uz/api/books/${parseId}`)
    .then(res => res.json())
    .then(data => {
        let { book, comment } = data.payload;
        console.log(data.payload)
        let imageFinalLink = `https://book.alitechbot.uz/${book.imageLink}`
        if (book.imageLink.startsWith('https')) {
            imageFinalLink = book.imageLink;
        }
        home.innerHTML += `
            <div class="home__card" id=${book._id}>
            <div id="home__card" class="home__card-block">
                    <img class="home__card-img" src="${book.imageLink ? imageFinalLink : defaultImg}"/>
                    </div>
                <div class="home__card-block">
                <div class="home__card-block-inner">
                        <h1 class="home__card-title">${book.title} (${book.year})</h1>
                    </div>
                    <a href="#" class="home__card-author"><img class="home__card-title-img" src="./img/fountain-pen-close-up.svg" /> By : ${book.author.firstName}</a>
                    <p class="home__card-lang"><img class="home__card-title-img" src="./img/global.svg" /> Language : ${book.language}</p>
                    <p class="home__card-count"><img class="home__card-title-img" src="./img/placeholder.svg" /> Country : ${book.country}</p>
                    <p class="home__card-page"><img class="home__card-title-img" src="./img/open-book.svg" /> Pages : ${book.pages}</p>
                    <div class="home__card-inner-text">
                        <img src="./img/document.svg" class="home__card-title-img" />
                        <p>${book.description}</p>
                    </div>
                </div>
                </div>
                <div>
                    <h2 class="home__comment-title">Add Comment</h2>
                    <div class="home__comment-inner-inp">
                        <input type="text" id="home__card-inp"/>
                        <button id="home__card-btn" onclick="sendComment(event)">Add</button>
                    </div>
                </div>
                `;
        comment.forEach(item => {
            let date = item.createdAt.substr(0, item.createdAt.indexOf('T'));
            let time = item.createdAt.slice(item.createdAt.indexOf('T'), item.createdAt.indexOf('.'))
            console.log(date, time)
            home.innerHTML += `
            <div id="comment-inner">
                <div>
                    <img class"comment__img" src="../img/admin.svg"/>
                    <h3>${item.user.firstName} ${item.user.lastName}</h3>
                </div>
                <div>
                    <p>${item.text}</p> 
                </div>
             </div>`
        })
    });

// let commentInner = document.getElementById('comment-inner');

// bookParse.comment.forEach(item => {
//     let commentText = `
//         <div id="comment">${item.text}</div>
//      `
//     commentInner.innerHTML += commentText;
// })

// let inpValue = document.getElementById('home__card-inp');

// function sendComment(event) {
//     event.preventDefault();
//     let homeCard = document.getElementById('home__card');
//     const bookId3 = homeCard.parentElement.id;
//     fetch('https://book.alitechbot.uz/api/books/comment', {
//         method: "POST",
//         body: JSON.stringify({
//             bookId: bookId3,
//             text: inpValue.value
//         }),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.token} `
//         }
//     })
//         .then(res => res.json())
//         .then(data => {
//             commentInner.innerHTML += `<p>${data.payload.text}</p>`
//         })
// }


// console.log(bookParse);