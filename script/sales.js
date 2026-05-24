
lucide.createIcons();

/*
COPY YOUR PRODUCTS ARRAY
FROM stock.html HERE
*/

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    description: "Premium running shoe",
    amount: 20000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 2,
    name: "Black Hoodie",
    description: "Comfortable cotton hoodie",
    amount: 15000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  }
];

const sales = [];

const saleModal =
document.getElementById("saleModal");

const productSelect =
document.getElementById("productSelect");

const salesContainer =
document.getElementById("salesContainer");

document
.getElementById("newSaleBtn")
.onclick = openModal;

document
.getElementById("closeSaleModal")
.onclick = closeModal;

function openModal() {

  productSelect.innerHTML =
  '<option value="">Select Product</option>';

  products.forEach(product => {

    productSelect.innerHTML += `
      <option value="${product.id}">
        ${product.name}
      </option>
    `;

  });

  saleModal.classList.remove("hidden");
  saleModal.classList.add("flex");
}

function closeModal() {

  saleModal.classList.add("hidden");
  saleModal.classList.remove("flex");

}

productSelect.addEventListener(
"change",
() => {

  const product =
  products.find(
    p => p.id == productSelect.value
  );

  if(!product) return;

  document
  .getElementById("selectedProduct")
  .classList.remove("hidden");

  document
  .getElementById("previewImage")
  .src = product.image;

  document
  .getElementById("previewName")
  .textContent = product.name;

  document
  .getElementById("previewDescription")
  .textContent = product.description;

  document
  .getElementById("previewAmount")
  .textContent =
  "₦" + product.amount.toLocaleString();

});

document
.getElementById("saveSale")
.onclick = () => {

  const product =
  products.find(
    p => p.id == productSelect.value
  );

  if(!product){
    alert("Select a product");
    return;
  }

  const quantity =
  Number(
    document.getElementById("saleQuantity")
    .value
  );

  const type =
  document.getElementById("saleType")
  .value;

  sales.unshift({

    id: Date.now(),

    productName: product.name,

    productImage: product.image,

    amount: product.amount,

    quantity,

    total:
    product.amount * quantity,

    type,

    date:
    new Date().toLocaleDateString()

  });

  renderSales();

  closeModal();

};

function renderSales(){

  salesContainer.innerHTML =
  sales.map(sale => `

    <div class="p-5 border-b">

      <div class="flex gap-4">

        <img
          src="${sale.productImage}"
          class="w-20 h-20 rounded-xl object-cover"
        >

        <div class="flex-1">

          <h3 class="font-semibold">
            ${sale.productName}
          </h3>

          <p class="text-sm text-slate-500 mt-1">
            Qty: ${sale.quantity}
          </p>

          <p class="text-sm text-slate-500">
            ${sale.type}
          </p>

          <p class="text-sm text-slate-500">
            ${sale.date}
          </p>

        </div>

        <div class="font-bold">
          ₦${sale.total.toLocaleString()}
        </div>

      </div>

    </div>

  `).join("");

  updateStats();
}

function updateStats(){

  const total =
  sales.reduce(
    (sum,sale)=>sum+sale.total,
    0
  );

  const online =
  sales
  .filter(s=>s.type==="Online")
  .reduce((sum,s)=>sum+s.total,0);

  const offline =
  sales
  .filter(s=>s.type==="Offline")
  .reduce((sum,s)=>sum+s.total,0);

  document
  .getElementById("totalSales")
  .textContent =
  "₦" + total.toLocaleString();

  document
  .getElementById("totalTransactions")
  .textContent =
  sales.length;

  document
  .getElementById("onlineSales")
  .textContent =
  "₦" + online.toLocaleString();

  document
  .getElementById("offlineSales")
  .textContent =
  "₦" + offline.toLocaleString();
}
