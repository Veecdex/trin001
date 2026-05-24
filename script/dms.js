
    function openChat(name, initials) {
      document.getElementById("chatName").innerText = name;
  
      const panel = document.getElementById("chatPanel");
  
      // mobile slide in
      panel.classList.remove("translate-x-full");
      panel.classList.add("translate-x-0");
    }
  
    function closeChat() {
      const panel = document.getElementById("chatPanel");
  
      panel.classList.add("translate-x-full");
      panel.classList.remove("translate-x-0");
    }

    lucide.createIcons();
  
    // =========================
    // DATA (your backend later can replace this)
    // =========================
    const chats = [
{
  id:1,
  name:"Sarah Johnson",
  lastMessage:"Is this still available?",
  time:"2m",
  color:"bg-pink-500",
  messages:[
    {type:"user",text:"Hello, is it available?"},
    {type:"me",text:"Yes, it is available."}
  ]
},

{
  id:2,
  name:"Michael Brown",
  lastMessage:"Can I get discount?",
  time:"10m",
  color:"bg-emerald-500",
  messages:[
    {type:"user",text:"Can I get discount?"},
    {type:"me",text:"Yes, for bulk orders 👍"}
  ]
},

{
  id:3,
  name:"Emily Carter",
  lastMessage:"Order confirmed?",
  time:"1h",
  color:"bg-orange-500",
  messages:[
    {type:"user",text:"Order confirmed?"},
    {type:"me",text:"Yes, your order is confirmed."}
  ]
}
];
  
    let activeChat = null;
  
    // =========================
    // RENDER CHAT LIST
    // =========================
    function renderChats(filteredChats = chats) {

const chatList = document.getElementById("chatListItems");

chatList.innerHTML = "";

if(filteredChats.length === 0){

  chatList.innerHTML = `
    <div class="p-6 text-center text-slate-400 text-sm">
      No customer found
    </div>
  `;

  return;
}

filteredChats.forEach(chat => {

  const div = document.createElement("div");

  div.className =
    "flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50";

  div.onclick = () => openChat(chat.id);

  div.innerHTML = `
    <div class="w-10 h-10 rounded-full ${chat.color}
    text-white flex items-center justify-center font-semibold text-sm">
      ${getInitials(chat.name)}
    </div>

    <div class="flex-1 min-w-0">
      <p class="font-medium text-sm truncate">${chat.name}</p>
      <p class="text-xs text-slate-500 truncate">${chat.lastMessage}</p>
    </div>

    <span class="text-[10px] text-slate-400">${chat.time}</span>
  `;

  chatList.appendChild(div);

});

}
    // =========================
    // OPEN CHAT
    // =========================
    function openChat(chatId){

activeChat = chats.find(c => c.id === chatId);

document.getElementById("chatName").innerText =
  activeChat.name;

const avatar = document.getElementById("chatAvatar");

avatar.className =
`w-9 h-9 rounded-full ${activeChat.color}
text-white flex items-center justify-center text-sm font-semibold`;

avatar.textContent =
  getInitials(activeChat.name);

renderMessages();

const panel = document.getElementById("chatPanel");

panel.classList.remove("translate-x-full");
panel.classList.add("translate-x-0");
}
  
    // =========================
    // RENDER MESSAGES
    // =========================
    function renderMessages() {
      const box = document.getElementById("messages");
      box.innerHTML = "";
  
      activeChat.messages.forEach(msg => {
        const wrapper = document.createElement("div");
  
        if (msg.type === "me") {
          wrapper.className = "flex justify-end";
          wrapper.innerHTML = `
            <div class="max-w-[75%] text-sm bg-indigo-600 text-white px-3 py-2 rounded-2xl">
              ${msg.text}
            </div>
          `;
        } else {
          wrapper.className = "flex";
          wrapper.innerHTML = `
            <div class="max-w-[75%] text-sm bg-white px-3 py-2 rounded-2xl shadow-sm">
              ${msg.text}
            </div>
          `;
        }
  
        box.appendChild(wrapper);
      });
    }
  
    // =========================
    // CLOSE CHAT
    // =========================
    function closeChat() {
      const panel = document.getElementById("chatPanel");
      panel.classList.add("translate-x-full");
      panel.classList.remove("translate-x-0");
    }
  
    // INIT
    renderChats();

    function getInitials(name){
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
}
renderChats();

if(window.innerWidth >= 768){
  openChat(chats[0].id);
}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

  const value = this.value.toLowerCase().trim();

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(value)
  );

  renderChats(filteredChats);

});
renderChats();

if(window.innerWidth >= 768){
  openChat(chats[0].id);
}
lucide.createIcons();
