const WHATSAPP="201023466292"; // غيّر الرقم إلى رقم واتساب المتجر بدون +
const products=[
 {id:1,name:"Samsung Galaxy A25",price:12999,type:"new",icon:"📱",tag:"جديد"},
 {id:2,name:"iPhone 13",price:18500,type:"used",icon:"📱",tag:"مستعمل"},
 {id:3,name:"شاشة Samsung A12",price:850,type:"screens",icon:"🖥️",tag:"شاشة"},
 {id:4,name:"شاحن سريع Type-C",price:350,type:"accessories",icon:"🔌",tag:"إكسسوار"},
 {id:5,name:"Redmi Note 14",price:10999,type:"new",icon:"📱",tag:"جديد"},
 {id:6,name:"Oppo Reno 8",price:7200,type:"used",icon:"📱",tag:"مستعمل"},
 {id:7,name:"شاشة Oppo A78",price:1200,type:"screens",icon:"🖥️",tag:"شاشة"},
 {id:8,name:"سماعة بلوتوث",price:550,type:"accessories",icon:"🎧",tag:"إكسسوار"}
];
let cart=[];
const fmt=n=>new Intl.NumberFormat("ar-EG").format(n);
function render(list=products){
 const grid=document.querySelector("#productsGrid");
 grid.innerHTML=list.map(p=>`<article class="product">
  <div class="product-img">${p.icon}</div><div class="product-body">
  <span class="tag">${p.tag}</span><h3>${p.name}</h3><small>${p.type==="new"?"ضمان المتجر":p.type==="used"?"حالة ممتازة":"متوفر حسب الموديل"}</small>
  <span class="price">${fmt(p.price)} ج.م</span><button class="btn primary" onclick="addToCart(${p.id})">أضف للسلة</button>
  </div></article>`).join("") || `<p>مفيش منتجات مطابقة للبحث.</p>`;
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);updateCart();toggleCart(true)}
function updateCart(){
 document.querySelector("#cartCount").textContent=cart.length;
 document.querySelector("#cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><span>${p.name}</span><b>${fmt(p.price)} ج.م<br><button onclick="removeCart(${i})">حذف</button></b></div>`).join(""):"<p>السلة فاضية.</p>";
 document.querySelector("#cartTotal").textContent=fmt(cart.reduce((s,p)=>s+p.price,0));
}
function removeCart(i){cart.splice(i,1);updateCart()}
function toggleCart(force){
 const c=document.querySelector("#cart"),o=document.querySelector("#overlay");
 const open=force===true||!c.classList.contains("open");
 c.classList.toggle("open",open);o.classList.toggle("show",open);
}
function orderCart(){
 if(!cart.length)return alert("السلة فاضية");
 const text="مرحبًا الحوت ستور، أريد طلب:%0A"+cart.map(p=>`• ${p.name} — ${p.price} ج.م`).join("%0A")+"%0Aالإجمالي: "+cart.reduce((s,p)=>s+p.price,0)+" ج.م";
 window.open(`https://wa.me/${WHATSAPP}?text=${text}`,"_blank");
}
function apply(){
 const q=document.querySelector("#search").value.trim().toLowerCase(),f=document.querySelector("#filter").value;
 render(products.filter(p=>(f==="all"||p.type===f)&&(!q||p.name.toLowerCase().includes(q))));
}
document.querySelector("#search").addEventListener("input",apply);
document.querySelector("#filter").addEventListener("change",apply);
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{document.querySelector("#filter").value=b.dataset.filter;document.querySelector("#products").scrollIntoView();apply()});
document.querySelector("#whatsappLink").href=`https://wa.me/${WHATSAPP}`;
document.querySelector("#repairBtn").href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا الحوت ستور، أريد طلب صيانة لموبايلي.")}`;
render();updateCart();
