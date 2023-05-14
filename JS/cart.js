let cart = JSON.parse(localStorage.getItem("cart"));
let box = document.querySelector('.box');
let total_price = document.querySelector('.total-price');
let totalSum = document.querySelector('.total-sum');

const renderCart = (arr=[]) => {
  box.innerHTML = arr.map((item) => (
    `
     <div class="cart-box">
       <img class="cancel" id="${item.id}" src="../img/cancel.svg" />
       <img width="140" src="${item.image}" alt="img"/>
       <h3>${item.title}</h3>
       <p>$${item.price}</p>
     </div>
    `
  )).join("")
};

renderCart(cart);


const totalSumm = () =>{
	let result = JSON.parse(localStorage.getItem('cart'));
	let total = 0;
	for (let i in result) {
		total += result[i].price;
	}
	total_price.innerHTML = `$${total.toFixed(3)}`;
	totalSum.innerHTML = `$${total.toFixed(3)}`;
	JSON.stringify(localStorage.setItem('total_price', JSON.stringify(total)));
}

totalSumm();

box.addEventListener('click', e => {
	if (e.target.className == 'cancel') {
		let a = JSON.parse(localStorage.getItem('cart'));
		let res = a.find(item => item.id == e.target.id);
	 index = a.indexOf(res);
	 index > -1 ? a.splice(index, 1) : "";
   localStorage.setItem('cart', JSON.stringify(a));

		renderCart(a);
    totalSumm()
	}
});




