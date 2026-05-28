
let orders = JSON.parse(localStorage.getItem("orders"));

if (!orders) {
  orders = [
    {
      id: "ORD-1021",
      customer: "John Doe",
      phone: "+229 60 00 00 00",
      address: "Cotonou, Littoral",
      status: "Successful",
      items: [
        { name: "Shoes", qty: 2 },
        { name: "Bag", qty: 1 }
      ],
      total: 120
    },
    {
      id: "ORD-1022",
      customer: "Mary Smith",
      phone: "+229 61 11 11 11",
      address: "Porto-Novo",
      status: "Successful",
      items: [
        { name: "Watch", qty: 1 }
      ],
      total: 80
    }
  ];

  localStorage.setItem("orders", JSON.stringify(orders));
}
function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
        const container = document.getElementById("ordersContainer");
        
        function renderOrders(filteredOrders = orders) {

          container.innerHTML = "";
        
          if(filteredOrders.length === 0){
        
            container.innerHTML = `
              <div class="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400">
                No orders found
              </div>
            `;
        
            return;
          }
        
          filteredOrders.forEach(order => {
        
            const card = document.createElement("div");
        
            card.className =
              "bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3";
        
            card.innerHTML = `
              <div>
                <h3 class="font-semibold">${order.id}</h3>
                <p class="text-sm text-slate-500">${order.customer}</p>
                <p class="text-xs text-slate-400">${order.phone}</p>
              </div>
        
              <div class="text-sm text-slate-500">
                ${order.address}
              </div>
        
              <div class="flex items-center justify-between sm:justify-end gap-3">
        
                <span class="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                  ${order.status}
                </span>
        
                <button
                  onclick="openModal('${order.id}')"
                  class="px-3 py-1 text-xs rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                >
                  View Summary
                </button>
        
              </div>
            `;
        
            container.appendChild(card);
        
          });
          
        
        }
        const searchOrders = document.getElementById("searchOrders");

        searchOrders.addEventListener("input", function(){
        
          const value = this.value.toLowerCase().trim();
        
          const filtered = orders.filter(order =>
        
            order.id.toLowerCase().includes(value) ||
        
            order.customer.toLowerCase().includes(value) ||
        
            order.phone.toLowerCase().includes(value) ||
        
            order.address.toLowerCase().includes(value)
        
          );
        
          renderOrders(filtered);
        
        });
        function updateStats(){

          document.getElementById("totalOrders").textContent =
            orders.length;
        
          document.getElementById("successfulOrders").textContent =
            orders.filter(o => o.status === "Successful").length;
        
          document.getElementById("pendingOrders").textContent =
            orders.filter(o => o.status === "Pending").length;
        
        }
        
        updateStats();
            function openModal(orderId) {
              const order = orders.find(o => o.id === orderId);
              const modal = document.getElementById("orderModal");
              const content = document.getElementById("modalContent");
            
              content.innerHTML = `
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Customer:</strong> ${order.customer}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Address:</strong> ${order.address}</p>
            
                <div class="mt-3">
                  <p class="font-semibold mb-1">Items:</p>
                  ${order.items.map(i => `<p>• ${i.qty}x ${i.name}</p>`).join("")}
                </div>
            
                <p class="mt-3 font-bold text-slate-800">Total: $${order.total}</p>
              `;
            
              modal.classList.remove("hidden");
            }
            
            function closeModal() {
              document.getElementById("orderModal").classList.add("hidden");
            }
            
            // INITIAL PAGE LOAD
            renderOrders();
            updateStats();
            lucide.createIcons();