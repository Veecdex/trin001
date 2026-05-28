lucide.createIcons();

// 1. Default seed data (only used if localStorage is empty)
const defaultCustomers = [
  {
    name: "John Doe",
    email: "john@email.com",
    phone: "+234 812 345 6789"
  },
  {
    name: "Sarah James",
    email: "sarah@email.com",
    phone: "+234 803 111 2222"
  },
  {
    name: "Michael Smith",
    email: "michael@email.com",
    phone: "+234 901 555 3333"
  }
];

// 2. Load from localStorage OR seed it once
function getCustomers() {
  let stored = localStorage.getItem("customers");

  if (!stored) {
    localStorage.setItem("customers", JSON.stringify(defaultCustomers));
    return defaultCustomers;
  }

  return JSON.parse(stored);
}

// 3. Render function (always uses localStorage data)
function renderCustomers() {
  const customers = getCustomers();
  const container = document.getElementById("customersList");

  container.innerHTML = customers.map((c) => `
    <div class="customer-row grid grid-cols-4 gap-4 px-6 py-5 border-b items-center">

      <div>
        <p class="font-semibold">${c.name}</p>
      </div>

      <div>
        ${c.email}
      </div>

      <div>
        ${c.phone}
      </div>

      <div>
        <button onclick="callCustomer('${c.phone}')"
          class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm flex items-center gap-2">
          <i data-lucide="phone"></i>
          Call
        </button>
      </div>

    </div>
  `).join("");

  lucide.createIcons();
}

// 4. Call function (unchanged)
function callCustomer(phone) {
  window.location.href = `tel:${phone}`;
}

// 5. Run once on load
renderCustomers();