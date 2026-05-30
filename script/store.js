/* PRODUCTS */

const products = [
{
id:1,
name:"Oreo Biscuit",
price:1500,
description:"Crunchy chocolate sandwich biscuits loved by all ages.",
image:"images/pro 4.jpg"
},
{
id:2,
name:"Coca-Cola",
price:1000,
description:"Refreshing chilled Coca-Cola soft drink.",
image:"images/pro 3.jpg"
},
{
id:3,
name:"Sprite",
price:1000,
description:"Lemon-lime soft drink with a crisp refreshing taste.",
image:"images/pro 2.jpg"
},
{
id:4,
name:"Cremux",
price:2500,
description:"Rich and creamy beverage product for everyday enjoyment.",
image:"images/pro 1.jpg"
},
{
id:5,
name:"Groundnut",
price:3000,
description:"Fresh quality groundnuts perfect for snacking.",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8tV2rNbutLQaZL7gAH7SSkH7pBUKZZDs8A&s"
},
{
id:6,
name:"Nutella",
price:8500,
description:"Hazelnut cocoa spread ideal for bread and desserts.",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALx0H2IuLMV4gBw8fXbpa---MRbsGyWM9Mg&s"
},
{
id:7,
name:"Nescafé",
price:4500,
description:"Premium instant coffee with rich aroma and flavor.",
image:"images/pro 8.jpg"
},
{
id:8,
name:"Cornflakes",
price:5000,
description:"Nutritious breakfast cereal for the whole family.",
image:"images/pro 9.jpg"
}
];


/* PRODUCT GRID */

const productsGrid = document.getElementById("productsGrid");

let productsHTML = "";

products.forEach(product => {

productsHTML += `
<div class="gallery-item relative overflow-hidden">

<div class="absolute inset-0 flex items-center justify-center z-10">

<button
data-id="${product.id}"
class="shop-btn absolute inset-0 flex items-center justify-center z-10">

<div class="bg-white/95 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">

<svg xmlns="http://www.w3.org/2000/svg"
width="16"
height="16"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2">

<circle cx="9" cy="21" r="1"></circle>
<circle cx="20" cy="21" r="1"></circle>
<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>

</svg>

<span class="text-sm font-semibold">
Shop
</span>

</div>

</button>

</div>

<img
src="${product.image}"
loading="lazy"
class="w-full aspect-square object-cover brightness-75"/>

</div>
`;

});

productsGrid.innerHTML = productsHTML;

lucide.createIcons();


/* PRODUCT MODAL */

const modal = document.getElementById("productModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");

let currentProduct = null;

function showProduct(id){

  loader.classList.remove("hidden");
  
  setTimeout(()=>{
  
  currentProduct =
  products.find(product => product.id === id);
  
  quantity = 1;
  quantityDisplay.textContent = quantity;
  
  modalImage.src = currentProduct.image;
  modalName.textContent = currentProduct.name;
  modalDescription.textContent = currentProduct.description;
  
  modalPrice.textContent =
  "₦" + currentProduct.price.toLocaleString();
  
  loader.classList.add("hidden");
  
  modal.classList.remove("hidden");
  
  },300);
  
  }


/* EVENT DELEGATION */

productsGrid.addEventListener("click",(e)=>{

const button = e.target.closest(".shop-btn");

if(!button) return;

showProduct(
Number(button.dataset.id)
);

});


/* CLOSE MODAL */

document
.getElementById("closeModal")
.addEventListener("click",()=>{

modal.classList.add("hidden");

});


/* CLOSE WHEN BACKDROP CLICKED */

modal.addEventListener("click",(e)=>{

if(e.target === modal){

modal.classList.add("hidden");

}

});

let quantity = 1;

const quantityDisplay =
document.getElementById("quantityDisplay");

document
.getElementById("plusQty")
.addEventListener("click",()=>{

quantity++;

quantityDisplay.textContent =
quantity;

});

document
.getElementById("minusQty")
.addEventListener("click",()=>{

if(quantity > 1){

quantity--;

quantityDisplay.textContent =
quantity;

}

});
/* CART */

let cart = [];

document
.getElementById("addToCartBtn")
.addEventListener("click",()=>{

if(!currentProduct) return;
for(let i = 0; i < quantity; i++){

  cart.push(currentProduct);
  
  }

document.getElementById("cartCount")
.textContent = cart.length;

modal.classList.add("hidden");

});