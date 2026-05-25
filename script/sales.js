lucide.createIcons();
function saveTransactions(transactions) {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

function getTransactions() {
  return JSON.parse(
    localStorage.getItem("transactions")
  ) || [];
}
const products =
JSON.parse(localStorage.getItem("products")) || [];

let sales =
JSON.parse(localStorage.getItem("sales")) || [];

const saleModal =
document.getElementById("saleModal");

const productSelect =
document.getElementById("productSelect");

const salesContainer =
document.getElementById("salesContainer");

function saveSales() {
  localStorage.setItem("sales", JSON.stringify(sales));
}

document
.getElementById("newSaleBtn")
.onclick = openModal;

document
.getElementById("closeSaleModal")
.onclick = closeModal;

function openModal() {

  productSelect.innerHTML =
  `<option value="">Select Product</option>`;

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

  document.getElementById("selectedProduct")
  ?.classList.add("hidden");

  document.getElementById("saleQuantity").value = "";
}

productSelect.addEventListener(
  "change",
  () => {

    const product =
    products.find(
      p => p.id == productSelect.value
    );

    if (!product) return;

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
    .textContent =
    product.description;

    document
    .getElementById("previewAmount")
    .textContent =
    "₦" + Number(product.amount).toLocaleString();
  }
);

document
.getElementById("saveSale")
.onclick = () => {

  const product =
  products.find(
    p => p.id == productSelect.value
  );

  if (!product) {
    alert("Select Product");
    return;
  }

  const quantity =
  Number(
    document.getElementById("saleQuantity")
    .value
  );

  if (!quantity || quantity < 1) {
    alert("Enter Quantity");
    return;
  }

  const type =
  document.getElementById("saleType")
  .value;

  const total =
  Number(product.amount) * quantity;
  
  const sale = {
  
    id: Date.now(),
  
    productId: product.id,
  
    quantity,
  
    amount: product.amount,
  
    total,
  
    type,
  
    date:
    new Date().toLocaleDateString()
  
  };
  
  sales.unshift(sale);
  
  /* CREATE TRANSACTION */
  
  const transactions =
  getTransactions();
  
  transactions.unshift({
  
    id:
    "TXN-" +
    Math.floor(
      100000 + Math.random() * 900000
    ),
  
    type: "credit",
  
    category: "product_sale",
  
    amount: total,
  
    product: product.name,
  
    quantity,
  
    status: "successful",
  
    date:
    new Date().toLocaleString()
  
  });
  
  saveTransactions(transactions);
  saveSales();
  renderSales();
  closeModal();

};

function renderSales() {

  if (sales.length === 0) {

    salesContainer.innerHTML = `
      <div class="p-10 text-center text-slate-500">
        No Sales Yet
      </div>
    `;

    updateStats();
    return;
  }

  salesContainer.innerHTML =
  sales.map(sale => {

    const product =
    products.find(
      p => p.id == sale.productId
    );

    return `
      <div class="p-5 border-b">

        <div class="flex gap-4">

          <img
            src="${product?.image || 'https://placehold.co/200'}"
            class="w-20 h-20 rounded-xl object-cover"
          >

          <div class="flex-1">

            <h3 class="font-semibold">
              ${product?.name || "Deleted Product"}
            </h3>

            <p class="text-sm text-slate-500">
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
            ₦${Number(sale.total).toLocaleString()}
          </div>

        </div>

      </div>
    `;

  }).join("");

  updateStats();
}

function updateStats() {

  const total =
  sales.reduce(
    (sum, sale) => sum + Number(sale.total),
    0
  );

  const online =
  sales
  .filter(s => s.type === "Online")
  .reduce(
    (sum, sale) => sum + Number(sale.total),
    0
  );

  const offline =
  sales
  .filter(s => s.type === "Offline")
  .reduce(
    (sum, sale) => sum + Number(sale.total),
    0
  );

  document
  .getElementById("totalSales")
  .textContent =
  "₦" + total.toLocaleString();

  document
  .getElementById("onlineSales")
  .textContent =
  "₦" + online.toLocaleString();

  document
  .getElementById("offlineSales")
  .textContent =
  "₦" + offline.toLocaleString();
}

renderSales();