let page = JSON.parse(localStorage.getItem('singleproduct'));
let box = document.querySelector('.box');

function render(arr = []) {
	box.innerHTML = arr
		.map(
			el => `
<div class="item">
<img style='width: 180px' src="${el.image}" alt="img">
<h2 class="title">${el.title}</h2>
<h3 class="cart-item-price">$${el.price}</h3>
<p class="description>${el.description}</p>
<p>${el.category}</p>
</div>
`
		)
		.join('');
};


render(page);





