const categories = document.querySelector('.categories');
const bestseller_title = document.querySelector('.bestseller-title');
const productBox = document.querySelector('.products');
const loadmore = document.querySelector('.load-more');
const cart = document.querySelector('.cart');
const cartCount = document.querySelector('.cart-count');
const price = document.querySelector('.price');

const BACE_URL = "https://fakestoreapi.com/products";

let products = [];
let k = [];
let page = [];


function getAllCategory() {
  fetch(`${BACE_URL}/categories`).then(res => res.json()).then(data => renderCategories(data))
}

getAllCategory()

function renderCategories (data) {
  categories.innerHTML = data.map((e)=> `
    <li class="bestseller-category-item">${e}</li>
  `).join("");
}



function getProduct () {
  fetch(`${BACE_URL}?limit=8`).then(res => res.json())
  .then(data => {renderProducts(data) 
    for(let i in data) {
    products.push(data[i])
  }
});
}

getProduct()

totalPrice();

function renderProducts (data) {
  productBox.innerHTML = data.map((el) => `
    <div class="card">
      <img src="${el.image}" class="card-img" alt="img"/>
      <h3 class="car-title">${el.title}</h3>
      <div class="rate">
                <p class="rate_text">${el.rating.rate}</p>
                <p class="rate_count">Count: ${el.rating.count}</p>
            </div>
      <ul class="card-list">
        <li class="card-price">$${el.price}</li>
        <li class="sale">24% Off</li>
      </ul>
      <button id="${el.id}" class="cart-btn">Add to cart</button>
      <a href="./page.html" target="_blank">
      <button id="${el.id}" class="new-page-btn">Learn more</button>
      </a>
    </div>
  `).join("")
}

function getAllproducts () {
  fetch(`${BACE_URL}`).then(res => res.json()).then(data => {
    renderProducts(data);
    for(let i in data){
      products.push(data[i])
    }
  })
}

function getCategory (cat) {
  fetch(`https://fakestoreapi.com/products/category/${cat}`).then(res => res.json()).then(data => {
    renderProducts(data);
    for(let i in data){
      products.push(data[i])
    }
  })
}

categories.addEventListener('click', (e) => {
  if (e.target.className == 'bestseller-category-item') {
    getCategory(e.target.innerText);
    loadmore.innerHTML = "";
  }
})

loadmore.addEventListener('click', (e)=> {
  getAllproducts();
  loadmore.innerHTML = "";
})

bestseller_title.addEventListener('click', (e) => {
  getProduct();
  loadmore.innerHTML = "LOAD MORE";
})

cart.addEventListener('click', (e) => {
  window.location.href = "../cart.html";
});


productBox.addEventListener('click', e => {
  if (e.target.className == 'cart-btn') {
    let product = products.find(item => item.id == e.target.id);
    const check = k.find(item => item.id == e.target.id);
    if (!check) {
      k.push(product);
    };
    localStorage.setItem('cart', JSON.stringify(k));


    totalPrice();

  }
});

function totalPrice() {
  let res = JSON.parse(localStorage.getItem('cart'));
  let total = 0;
  for(let i in res){
    total += res[i].price;
  };
  price.innerHTML = '$' + total;
}

productBox.addEventListener('click', e => {
  if (e.target.className == 'new-page-btn') {
    let product = products.find(item => item.id == e.target.id);
    const check = page.find(item => item.id == e.target.id);
    if (!check) {
      page.push(product)
    };
    localStorage.setItem('singleproduct', JSON.stringify(page));
   
  }
})








