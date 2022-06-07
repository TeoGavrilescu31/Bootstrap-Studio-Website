let carts = document.querySelectorAll('.btn-cart');
let dlt = document.querySelectorAll('.delete-item');

let products = [
  {
    name : 'Breloc',
    tag : 'breloc',
    price : 20,
    inCart : 0
  },
  {
    name : 'Ornamente',
    tag : 'ornamente',
    price : 15,
    inCart : 0
  },
  {
    name : 'Casuta',
    tag : 'casuta',
    price : 30,
    inCart : 0
  },
  {
    name : 'Rama',
    tag : 'rama',
    price : 25,
    inCart : 0
  },
  {
    name : 'Invitatii',
    tag : 'invitatii',
    price : 10,
    inCart: 0
  },
  {
    name : 'Verighete',
    tag : 'verighete',
    price : 35,
    inCart : 0
  },
  {
    name : 'Tricouri',
    tag : 'tricou',
    price : 35,
    inCart : 0
  },
  {
    name : 'Hanorace',
    tag : 'hanorac',
    price : 45,
    inCart : 0
  },
  {
    name : 'Autocolante',
    tag : 'autocolant',
    price : 35,
    inCart : 0
  },
  {
    name : 'Stickere',
    tag : 'sticker',
    price : 20,
    inCart : 0
  }
];

for(let i=0; i < carts.length; i++){
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartItems(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.span-cart').textContent = productNumbers;
  }
}

function cartNumbers(product){
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if( productNumbers ){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.span-cart').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.span-cart').textContent = 1;
  }

  setItems(product);
}

function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null ){

    if(cartItems[product.tag] == undefined){
      cartItems ={
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart = 1;
    cartItems ={
      [product.tag]: product
    }
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  }else{
    localStorage.setItem('totalCost', product.price);
  }
}

function displayCart(){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');

  if( cartItems && productContainer ){
    productContainer.innerHTML = '';
    Object.values(cartItems).map( item => {
      productContainer.innerHTML += `
<div class="one-product">
      <div class="product">
        <a class="delete-item"><h5>X</h5></a>
        <img class="prd-img" src="${item.tag}.jpeg">
        <span>${item.name}</span>
</div>
      <div class="price price-2">${item.price}.00 lei</div>
      <div class="quantity quantity-2">${item.inCart}</div>
      <div class="total">${item.inCart * item.price}.00 lei</div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
          Basket Total
        </h4>
        <h4 class="basketTotal">
          ${cartCost}.00 lei
        </h4>
      </div>
</div>
    `
  }
}

for(let i=0; i < dlt.length; i++){
  dlt[i].addEventListener('click', () => {
    deleteItem(products[i]);
  })
}

function deleteItem(products){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems[product.tag] == undefined){
    cartItems ={
      ...cartItems,
      [product.tag]: product
    }
  }
  cartItems[product.tag].inCart = 0;

  localStorage.removeItem('productsInCart', JSON.stringify(cartItems));

}

onLoadCartItems();
displayCart();
