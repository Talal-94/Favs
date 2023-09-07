const items = [
    { id: 1, name: 'New Balance', rating: 0, description: 'New Balance casual sneakers', favorite: false, imgUrl: 'https://f.nooncdn.com/p/pzsku/Z12779D2BB27565143C10Z/45/_/1686376045/adb1f07c-bf0f-43e7-8440-5ae3fd13a1a9.jpg?format=avif&width=240'},
    { id: 2, name: 'New Balance', rating: 4, description: 'Comfortable party casual sneakers for both sexes', favorite: false, imgUrl: 'https://f.nooncdn.com/p/pzsku/ZD87224DD0345AB2DA09FZ/45/_/1680234538/b0a0c47e-5849-48e0-b7e7-226ad503a8bf.jpg?format=avif&width=240' },
    { id: 3, name: 'Adidas', rating: 2, description: 'Ultimashow Lace-Up Sports Shoes Blue', favorite: false, imgUrl: 'https://f.nooncdn.com/p/v1680439788/N50501298V_1.jpg?format=avif&width=240' },
    { id: 4, name: 'New Balance', rating: 4, description: 'Unisex 1960 Comfortable Party Shoes', favorite: false, imgUrl: 'https://f.nooncdn.com/p/pzsku/Z0AF611FB1813FBEA35E8Z/45/_/1680233664/374d8e7a-846e-4a07-99d4-b7c8e0fbc89a.jpg?format=avif&width=240' },
    { id: 5, name: 'New Balance', rating: 4, description: 'Arshi running shoes', favorite: false, imgUrl: 'https://f.nooncdn.com/p/v1566899251/N26889850V_1.jpg?format=avif&width=240' },
    { id: 6, name: 'New Balance', rating: 3, description: 'Comfortable sports casual shoes for both men and women', favorite: false, imgUrl: 'https://f.nooncdn.com/p/pzsku/Z4E2285FFE7AD3FE4B5A8Z/45/_/1680231526/09b25bc3-ce52-486e-ab1a-03d5334226a3.jpg?format=avif&width=240' },
    { id: 7, name: 'Adidas', rating: 5, description: 'Ligra 7 Indoor Training Shoes Black', favorite: false, imgUrl: 'https://f.nooncdn.com/p/v1632733899/N47732671V_1.jpg?format=avif&width=240' },
];

const itemsList = document.getElementById('items-list');
const favoritesList = document.getElementById('favorites-list');
const favoritesCount = document.getElementById('favorites-count');


function renderItems() {
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="card cards">
            <a class="anchor" onclick="functionname()">
                <img src="${item.imgUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    </a>
                    <div class="rating-box">
                    <button ${item.favorite ? 'class="favorite"' : 'class="unfavorite"'} data-id="${item.id}">  ${item.favorite ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'}</i></button>
                        <div class = "rating">${getRatingStars(item.rating)}</div>
                    </div>
                </div>
            </div>
         `;
        li.querySelector('button').addEventListener('click', toggleFavorite);
        itemsList.appendChild(li);
    });
}

function toggleFavorite(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.favorite = !item.favorite;
        saveItemsToLocalStorage(); 
        renderItems();
        renderFavorites();
    }
}


function functionname(){
    console.log("khloiud")
}



function getRatingStars(rating) {
    const maxRating = 5; 
    let stars = '';
    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}











function renderFavorites() {
    favoritesList.innerHTML = '';
    const favoriteItems = items.filter(item => item.favorite);
    favoriteItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        favoritesList.appendChild(li);
    });
    favoritesCount.textContent = favoriteItems.length;
}


function saveItemsToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function loadItemsFromLocalStorage() {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        items.forEach(item => {
            const savedItem = parsedItems.find(savedItem => savedItem.id === item.id);
            if (savedItem) {
                item.favorite = savedItem.favorite;
            }
        });
    }
}

loadItemsFromLocalStorage(); 
renderItems();
// renderFavorites();
getRatingStars(items.rating);
