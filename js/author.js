let authorList = document.getElementById('author-list');
let authorInner = document.getElementById('about__inner-card');
var author;

fetch('https://book.alitechbot.uz/api/authors')
    .then(res => res.json())
    .then(data => {
        author = data.payload;
        console.log(data);
        data.payload.forEach(item => {
            authorInner.innerHTML += `<div id="${item._id}" class="about__card" onclick="takeId(this)">
            <img class="about__card-img" src="./img/writer.jpg"/>
            <h2 class="about__card-title">${item.firstName} ${item.lastName}</h2>
            <p class=""about__card-text >${item.phone}</p>
            <button onclick="getAuthor()" class="about__card-btn">more</button>
        </div>`
        });
    })
function takeId(el) {
    var authorId = el.id;
    var findAuthor = author.find(element => element._id === authorId);
    localStorage.setItem('author', JSON.stringify(findAuthor));
}

function getAuthor() {
    var parseAuthor = JSON.parse(localStorage.getItem('author'));
    location.replace("./author1.html")
}
