let home = document.getElementById('home__inner');
let authorParse = JSON.parse(localStorage.getItem('author'));

console.log(authorParse);
home.innerHTML += `
    <div class="home__card">
        <div class="home__card-block">
            <img class="home__card-img" src="./img/writer.jpg"/>
        </div>
        <div class="home__card-block">
            <div class="home__card-block-inner">
                <h1 class="home__card-title">${authorParse.firstName} ${authorParse.lastName}</h1>
            </div>
            <p class="home__card-lang"> Number : ${authorParse.phone}</p>
            <p class="home__card-lang"> Created : ${authorParse.createdAt}</p>
            <p class="home__card-count"> Update : ${authorParse.updatedAt}</p>
        </div>
    </div>
`