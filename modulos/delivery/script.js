
const cfg=window.WAP_DELIVERY_CONFIG||{};
const PRODUCTS=window.WAP_PRODUCTS||[];
let cart=JSON.parse(localStorage.getItem('wapPizzaCartV2')||'{}');
let filter='all';
let discount=0;
let trackingStep=0;
let custom={size:59.9,dough:'Tradicional',extras:0};

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const fmt=v=>(+v||0).toLocaleString('pt-BR',{style:'currency',currency:(cfg.business?.currency||'BRL')});

function toast(msg){
  const t=$('#toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1800);
}
function save(){
  localStorage.setItem('wapPizzaCartV2',JSON.stringify(cart));
  renderCart();
}
function applyBrand(){
  $('#restaurantName').textContent=cfg.brand?.shortName||'Sabor & Arte';
  $('#restaurantSince').textContent=cfg.brand?.since||'Desde 2015';
  $('#deliveryTime').textContent=cfg.business?.deliveryTime||'30–45 min';
  $('#openUntil').textContent=cfg.business?.openUntil||'23:30';
  $('#deliveryFee').textContent=fmt(cfg.business?.deliveryFee||0);
}
function renderProducts(){
  const list=PRODUCTS.filter(p=>filter==='all'||p.cat===filter||(filter==='promocoes'&&p.price<58));
  $('#productsGrid').innerHTML=list.map(p=>`
    <article class="product ${p.hot?'hot':''} ${p.cold?'cold':''}">
      <div class="photo" style="background-image:url('${p.img}')">
        ${p.badge?`<span class="badge">${p.badge}</span>`:''}
      </div>
      <div class="body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="buy"><b>${fmt(p.price)}</b><button onclick="add('${p.id}')">+</button></div>
      </div>
    </article>`).join('');
}
function add(id){
  const p=PRODUCTS.find(x=>x.id===id); if(!p)return;
  cart[id]=(cart[id]||0)+1; save(); toast(`${p.name} entrou no pedido`);
}
function change(id,d){
  cart[id]=(cart[id]||0)+d;
  if(cart[id]<=0) delete cart[id];
  save();
}
function removeItem(id){
  delete cart[id]; save(); toast('Item removido');
}
function itemData(id){
  if(id==='custom') return {name:'Pizza personalizada',price:custom.size+custom.extras};
  return PRODUCTS.find(x=>x.id===id);
}
function totals(){
  const sub=Object.entries(cart).reduce((s,[id,q])=>{
    const p=itemData(id); return s+(p?p.price:0)*q;
  },0);
  const discounted=sub*(1-discount);
  const fee=Object.keys(cart).length?(cfg.business?.deliveryFee||0):0;
  return {sub:discounted,fee,total:discounted+fee};
}
function renderCart(){
  const entries=Object.entries(cart);
  $('#cartCount').textContent=entries.reduce((n,[,q])=>n+q,0);
  $('#cartItems').innerHTML=entries.length?entries.map(([id,q])=>{
    const p=itemData(id);
    return `<div class="cart-item">
      <div><b>${p?.name||'Item'}</b><br><small>${fmt(p?.price||0)}</small></div>
      <div class="qty">
        <button onclick="change('${id}',-1)">−</button><span>${q}</span><button onclick="change('${id}',1)">+</button>
        <button class="remove" onclick="removeItem('${id}')">×</button>
      </div>
    </div>`;
  }).join(''):'<small>Seu pedido está vazio.</small>';
  const t=totals();
  $('#subtotal').textContent=fmt(t.sub);
  $('#deliveryFee').textContent=fmt(t.fee);
  $('#total').textContent=fmt(t.total);
}
$$('[data-filter]').forEach(b=>b.onclick=()=>{
  filter=b.dataset.filter;
  $$('.category-icons button').forEach(x=>x.classList.toggle('active',x.dataset.filter===filter));
  renderProducts();
  $('#menu')?.scrollIntoView({behavior:'smooth'});
});
$$('[data-scroll]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'}));

$$('[data-size]').forEach(b=>b.onclick=()=>{
  custom.size=+b.dataset.size;
  b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));
  b.classList.add('selected'); updateBuilder();
});
$$('[data-dough]').forEach(b=>b.onclick=()=>{
  custom.dough=b.dataset.dough;
  b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));
  b.classList.add('selected');
});
$$('[data-extra]').forEach(b=>b.onclick=()=>{
  b.classList.toggle('selected');
  custom.extras=$$('[data-extra].selected').reduce((n,x)=>n+(+x.dataset.extra),0);
  updateBuilder();
});
function updateBuilder(){ $('#builderPrice').textContent=fmt(custom.size+custom.extras) }

$('#addCustom').onclick=()=>{
  cart.custom=(cart.custom||0)+1; save(); toast('Sua pizza personalizada entrou no pedido');
};
$('#clearCart').onclick=()=>{cart={};save();toast('Pedido limpo')};
$('#applyCoupon').onclick=()=>{
  const code=$('#coupon').value.trim().toUpperCase();
  const rate=cfg.coupons?.[code];
  if(rate){discount=rate;toast(`Cupom ${code} aplicado`);renderCart()}
  else toast('Cupom inválido — teste WAP10');
};

function waLink(message){
  const number=(cfg.business?.whatsapp||'').replace(/\D/g,'');
  const text=encodeURIComponent(message);
  return number?`https://wa.me/${number}?text=${text}`:`https://wa.me/?text=${text}`;
}
$('#checkout').onclick=()=>{
  const entries=Object.entries(cart); if(!entries.length)return toast('Adicione algo ao pedido');
  const lines=entries.map(([id,q])=>`${q}x ${itemData(id)?.name||'Item'}`);
  const t=totals();
  const msg=`Olá! Quero fazer este pedido:\n${lines.join('\n')}\n\nTotal aproximado: ${fmt(t.total)}\n\nPedido criado no WAP Delivery.`;
  window.open(waLink(msg),'_blank');
  $('#trackingText').textContent='Pedido preparado para envio via WhatsApp.';
  trackingStep=Math.max(trackingStep,1); renderTracking();
};

const modal=$('#modal');
$('#openContact').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')};
$('#closeModal').onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
modal.onclick=e=>{if(e.target===modal)$('#closeModal').click()};
[$('#migoWhatsapp'),$('#modalWhatsapp')].forEach(b=>b.onclick=()=>window.open(waLink('Olá! Vi o modelo WAP Delivery e quero conversar.'),'_blank'));

function renderTracking(){
  const nodes=$$('#trackLine span');
  nodes.forEach((n,i)=>n.classList.toggle('done',i<=trackingStep));
  const texts=['Pedido recebido.','Sua pizza está no forno.','Pedido saiu para entrega.','Pedido entregue. Bom apetite!'];
  $('#trackingText').textContent=texts[trackingStep]||texts[0];
}
$('#simulateTracking').onclick=()=>{
  trackingStep=(trackingStep+1)%4; renderTracking();
};

applyBrand();
renderProducts();
renderCart();
updateBuilder();
renderTracking();
