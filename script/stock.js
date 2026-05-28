lucide.createIcons();

let editId = null;

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

let products =
JSON.parse(localStorage.getItem("products")) || [
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

saveProducts();

const productsContainer =
document.getElementById("productsContainer");

const modal =
document.getElementById("productModal");

const newProductBtn =
document.getElementById("newProductBtn");

const cancelProduct =
document.getElementById("cancelProduct");

const saveProduct =
document.getElementById("saveProduct");

const totalProducts =
document.getElementById("totalProducts");

const inventoryValue =
document.getElementById("inventoryValue");

function renderProducts() {

  productsContainer.innerHTML = products.map(product => `
  <div class="flex bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow transition">

    <img
      src="${product.image}"
      class="w-24 h-24 object-cover"
    >

    <div class="flex-1 p-3 flex flex-col justify-between">

      <div>
        <h3 class="font-semibold text-sm leading-tight">
          ${product.name}
        </h3>

        <p class="text-xs text-slate-500 mt-1 line-clamp-1">
          ${product.description}
        </p>
      </div>

      <div class="flex items-center justify-between mt-2">

        <span class="font-bold text-sm text-slate-900">
          ₦${Number(product.amount).toLocaleString()}
        </span>

        <div class="flex gap-1">

          <button
            onclick="editProduct(${product.id})"
            class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
          >
            <i data-lucide="pencil" class="w-4 h-4"></i>
          </button>

          <button
            onclick="deleteProduct(${product.id})"
            class="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>

        </div>

      </div>

    </div>

  </div>
`).join("");

  totalProducts.textContent = products.length;

  const totalValue =
  products.reduce(
    (sum, product) => sum + Number(product.amount),
    0
  );

  inventoryValue.textContent =
  "₦" + totalValue.toLocaleString();

  lucide.createIcons();
}

function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {

  modal.classList.add("hidden");
  modal.classList.remove("flex");

  document.getElementById("productName").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productAmount").value = "";
  document.getElementById("productImage").value = "";

  editId = null;
}

newProductBtn.onclick = () => {

  document.getElementById("modalTitle").textContent =
  "Create Product";

  openModal();
};

cancelProduct.onclick = closeModal;

saveProduct.onclick = () => {

  const name =
  document.getElementById("productName").value.trim();

  const description =
  document.getElementById("productDescription").value.trim();

  const amount =
  document.getElementById("productAmount").value;

  const file =
  document.getElementById("productImage").files[0];

  if (!name || !description || !amount) {
    showToast("Please fill all fields", "error");
    return;
  }

  const saveData = (imageUrl) => {

    if (editId) {

      const product =
      products.find(p => p.id === editId);

      if (!product) return;

      product.name = name;
      product.description = description;
      product.amount = Number(amount);

      if (imageUrl) {
        product.image = imageUrl;
      }

    } else {

      products.unshift({
        id: Date.now(),
        name,
        description,
        amount: Number(amount),
        image:
          imageUrl ||
          "https://placehold.co/600x400"
      });

    }

    saveProducts();
    renderProducts();
    closeModal();
    showToast(editId ? "Product updated successfully" : "Product created successfully", "success");
  };

  if (file) {

    const reader = new FileReader();

    reader.onload = (e) => {
      saveData(e.target.result);
    };

    reader.readAsDataURL(file);

  } else {

    saveData();

  }

};

function deleteProduct(id) {

  products = products.filter(product => product.id !== id);

  saveProducts();
  renderProducts();

  showToast("Product deleted", "error");
}

function editProduct(id) {

  const product =
  products.find(p => p.id === id);

  if (!product) return;

  editId = id;

  document.getElementById("modalTitle").textContent =
  "Edit Product";

  document.getElementById("productName").value =
  product.name;

  document.getElementById("productDescription").value =
  product.description;

  document.getElementById("productAmount").value =
  product.amount;

  openModal();
}
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };

  const toast = document.createElement("div");

  toast.className = `
    ${colors[type]}
    text-white px-4 py-3 rounded-xl shadow-lg
    text-sm animate-fade-in
  `;

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-x-5");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

renderProducts();