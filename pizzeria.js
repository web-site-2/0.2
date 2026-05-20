/* ═══════════════════════════════════════════════════
   PIZZERIA — COMPLETE CART & ORDER SYSTEM
   Fixed: onclick attribute quote injection bug,
   cart snapshot bug, modal backdrop, ESC key, etc.
═══════════════════════════════════════════════════ */

/* ── DATA ── */
const WA_NUM = '201276818198';

const FLAVORS = [
  {id:1, name:{en:'Margherita',ar:'مارغريتا'}, desc:{en:'San Marzano tomato, fior di latte, fresh basil, EVOO',ar:'طماطم سان مارزانو، فيور دي لاتي، ريحان طازج، زيت زيتون'}, price:229, badge:{en:'Popular',ar:'الأكثر طلباً'}, bc:'pop', img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80'},
  {id:2, name:{en:'Diavola',ar:'ديافولا'}, desc:{en:'Spicy salami, tomato, mozzarella, fresh chilli flakes',ar:'سلامي حار، طماطم، موزاريلا، فلفل حار'}, price:269, badge:{en:'Spicy',ar:'حار'}, bc:'spicy', img:'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80'},
  {id:3, name:{en:'Quattro Formaggi',ar:'أربعة أجبان'}, desc:{en:'Mozzarella, gorgonzola, taleggio, aged parmesan',ar:'موزاريلا، جورجونزولا، تاليجيو، بارميزان معتق'}, price:289, badge:{en:'Popular',ar:'الأكثر طلباً'}, bc:'pop', img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80'},
  {id:4, name:{en:'Prosciutto & Rucola',ar:'بروشوتو وجرجير'}, desc:{en:'Prosciutto di Parma, rocket, cherry tomatoes, parmesan',ar:'بروشوتو دي بارما، جرجير، طماطم كرزية، بارميزان'}, price:299, badge:{en:'',ar:''}, bc:'', img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80'},
  {id:5, name:{en:'BBQ Pollo',ar:'BBQ بولو'}, desc:{en:'Grilled chicken, BBQ sauce, red onion, cheddar',ar:'دجاج مشوي، صوص BBQ، بصل أحمر، شيدر'}, price:279, badge:{en:'Popular',ar:'الأكثر طلباً'}, bc:'pop', img:'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80'},
  {id:6, name:{en:'Vegana Primavera',ar:'خضراوات الربيع'}, desc:{en:'Seasonal veg, vegan mozzarella, pesto, cherry tomatoes',ar:'خضراوات موسمية، موزاريلا نباتية، بيستو، طماطم كرزية'}, price:249, badge:{en:'Vegan',ar:'نباتي'}, bc:'veg', img:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80'},
];

const MENU = {
  Pasta:{en:'Pasta',ar:'باستا',items:[
    {id:10,name:{en:'Cacio e Pepe',ar:'كاتشيو إي بيبي'},desc:{en:'Tonnarelli, pecorino romano, black pepper',ar:'تونارلي، بيكورينو رومانو، فلفل أسود'},price:189,t:'pop',img:'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=400&q=80'},
    {id:11,name:{en:'Carbonara',ar:'كاربونارا'},desc:{en:'Spaghetti, guanciale, egg yolk, pecorino',ar:'سباغيتي، جوانتشيالي، صفار بيض، بيكورينو'},price:199,t:'pop',img:'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80'},
    {id:12,name:{en:'Arrabbiata',ar:'أرابياتا'},desc:{en:'Penne, spicy tomato, garlic, parsley',ar:'بيني، طماطم حارة، ثوم، بقدونس'},price:169,t:'spicy',img:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80'},
  ]},
  Starters:{en:'Starters',ar:'مقبلات',items:[
    {id:20,name:{en:'Garlic Knots',ar:'ثقوب الثوم'},desc:{en:'Oven-baked, garlic butter, parsley, marinara dip',ar:'مخبوزة، زبدة ثوم، بقدونس، صوص مارينارا'},price:99,t:'pop',img:'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=400&q=80'},
    {id:21,name:{en:'Burrata',ar:'بوراتا'},desc:{en:'Creamy burrata, heritage tomatoes, basil oil',ar:'بوراتا كريمية، طماطم تراثية، زيت ريحان'},price:179,t:'',img:'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=80'},
    {id:22,name:{en:'Arancini',ar:'أرانشيني'},desc:{en:'Saffron risotto balls, mozzarella, sugo',ar:'كرات ريزوتو زعفران، موزاريلا، صوص'},price:139,t:'',img:'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80'},
  ]},
  Desserts:{en:'Desserts',ar:'حلويات',items:[
    {id:30,name:{en:'Tiramisu',ar:'تيراميسو'},desc:{en:'Savoiardi, mascarpone, espresso, cocoa',ar:'سافويياردي، ماسكاربوني، إسبريسو، كاكاو'},price:129,t:'pop',img:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80'},
    {id:31,name:{en:'Nutella Calzone',ar:'كالزوني نوتيلا'},desc:{en:'Fried dough, Nutella, ricotta, powdered sugar',ar:'عجينة مقلية، نوتيلا، ريكوتا، سكر بودرة'},price:139,t:'',img:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80'},
    {id:32,name:{en:'Panna Cotta',ar:'بانا كوتا'},desc:{en:'Vanilla, berry coulis, fresh mint',ar:'فانيليا، صوص توت، نعناع طازج'},price:109,t:'',img:'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&q=80'},
  ]},
};

const GALLERY = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80',
  'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=600&q=80',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
  'https://images.unsplash.com/photo-1551183053-bf91798d702c?w=900&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
];

const REVIEWS = [
  {n:'Sara M.',d:{en:'2 weeks ago',ar:'منذ أسبوعين'},s:5,t:{en:'Best pizza in Cairo, bar none. The Diavola had me sweating but I kept going back for more.',ar:'أفضل بيتزا في القاهرة على الإطلاق. الديافولا أشعلت فمي لكنني لم أتوقف — نكهة لا تُصدق.'}},
  {n:'Ahmed K.',d:{en:'1 month ago',ar:'منذ شهر'},s:5,t:{en:'We order every Friday. Kids love the Margherita, I love the Carbonara. Always hot on delivery!',ar:'نطلب كل جمعة. الأطفال يعشقون المارغريتا وأنا لا أستغني عن الكاربونارا. دائماً ساخن!'}},
  {n:'Lena R.',d:{en:'3 weeks ago',ar:'منذ ٣ أسابيع'},s:5,t:{en:'I judge food professionally — this is the real deal. Proper Neapolitan technique, outstanding char.',ar:'أحكم على الطعام مهنياً — هذا حقيقي. أسلوب نابولي حقيقي وتحمير رائع على القشرة.'}},
  {n:'Omar F.',d:{en:'1 week ago',ar:'منذ أسبوع'},s:5,t:{en:'The burrata starter alone is worth the visit. Warm, vibrant atmosphere. Everything exceptional.',ar:'مقبلة البوراتا وحدها تستحق الزيارة. أجواء دافئة وحيوية. كل شيء كان استثنائياً.'}},
  {n:'Dina H.',d:{en:'5 days ago',ar:'منذ ٥ أيام'},s:5,t:{en:'Fast delivery, still hot, perfectly packed. The garlic knots are dangerously addictive. 10/10!',ar:'توصيل سريع، لا يزال ساخناً، تغليف مثالي. ثقوب الثوم إدمان خطير. 10/10 في كل مرة!'}},
  {n:'James O.',d:{en:'2 months ago',ar:'منذ شهرين'},s:5,t:{en:'Tried the Quattro Formaggi on a whim — now I dream about it. Best thing I have eaten in Egypt.',ar:'جربت الأربعة أجبان عشوائياً — الآن أحلم بها. أفضل ما أكلته في مصر هذا العام.'}},
];

/* ── STATE ── */
let LANG = 'ar';
let cart = [];
try { cart = JSON.parse(localStorage.getItem('pizzeria_cart')) || []; } catch(e) { cart = []; }
let activeCat = 'Pasta';

/* ── LANGUAGE ── */
function setLang(l) {
  LANG = l;
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en]').forEach(el => { el.innerHTML = el.dataset[l] || el.dataset.en; });
  renderAll();
}
function t(o) { return o ? (o[LANG] || o.en || '') : ''; }

/* ── CART PERSISTENCE ── */
function saveCart() {
  try { localStorage.setItem('pizzeria_cart', JSON.stringify(cart)); } catch(e) {}
}

/* ── ADD / REMOVE / CHANGE ── */
function addToCart(id) {
  /* Look up item from all data sources by numeric id */
  let item = FLAVORS.find(p => p.id === id);
  if (!item) {
    for (const cat of Object.values(MENU)) {
      item = cat.items.find(it => it.id === id);
      if (item) break;
    }
  }
  if (!item) return;

  const ex = cart.find(i => i.id === id);
  if (ex) {
    ex.qty++;
  } else {
    cart.push({ id: item.id, nameEn: item.name.en, nameAr: item.name.ar, price: item.price, img: item.img, qty: 1 });
  }
  saveCart();
  renderCart();
  updateCount();
  showToast();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCount();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); updateCount(); }
}

/* ── CART COUNT BADGE ── */
function updateCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cc');
  if (!badge) return;
  badge.textContent = total;
  badge.classList.toggle('on', total > 0);
}

/* ── NAME HELPER using stored en/ar strings ── */
function cartItemName(item) {
  return LANG === 'ar' ? item.nameAr : item.nameEn;
}

/* ── RENDER CART DRAWER ── */
function renderCart() {
  const list = document.getElementById('cd-list');
  const foot = document.getElementById('cd-foot');
  if (!list || !foot) return;

  const titleEl = document.getElementById('cd-title');
  const totLbl  = document.getElementById('cd-tot-lbl');
  const waTxt   = document.getElementById('wa-txt');
  if (titleEl) titleEl.textContent = LANG === 'ar' ? 'طلبك' : 'Your Order';
  if (totLbl)  totLbl.textContent  = LANG === 'ar' ? 'الإجمالي' : 'Total';
  if (waTxt)   waTxt.textContent   = LANG === 'ar' ? 'إتمام الطلب' : 'Complete Order';

  if (!cart.length) {
    list.innerHTML = '<div class="cd-empty">' +
      '<div class="cd-empty-ico">🍕</div>' +
      '<div style="font-weight:600;font-size:15px;margin-bottom:4px">' + (LANG === 'ar' ? 'السلة فارغة' : 'Your cart is empty') + '</div>' +
      '<div style="font-size:13px;color:var(--muted);text-align:center;line-height:1.6;max-width:180px">' + (LANG === 'ar' ? 'أضف أصنافاً من القائمة' : 'Add items from the menu') + '</div>' +
      '</div>';
    foot.style.display = 'none';
    return;
  }

  foot.style.display = 'block';

  list.innerHTML = cart.map(function(it) {
    var name = LANG === 'ar' ? it.nameAr : it.nameEn;
    var lineTotal = (it.price * it.qty).toLocaleString();
    return '<div class="cd-item">' +
      '<div class="cd-thumb"><img src="' + it.img + '" alt="' + name + '" loading="lazy"/></div>' +
      '<div class="cd-info">' +
        '<div class="cd-name">' + name + '</div>' +
        '<div class="cd-price">EGP ' + it.price.toLocaleString() + ' &times; ' + it.qty + ' = <strong style="color:var(--orange)">EGP ' + lineTotal + '</strong></div>' +
        '<div class="cd-qty">' +
          '<button class="qb" data-id="' + it.id + '" data-d="-1">\u2212</button>' +
          '<span class="qv">' + it.qty + '</span>' +
          '<button class="qb" data-id="' + it.id + '" data-d="1">+</button>' +
        '</div>' +
      '</div>' +
      '<button class="cd-rm" data-id="' + it.id + '">\u2715</button>' +
    '</div>';
  }).join('');

  /* Attach events via delegation — no inline onclick at all */
  list.querySelectorAll('.qb').forEach(function(btn) {
    btn.addEventListener('click', function() {
      changeQty(parseInt(btn.dataset.id), parseInt(btn.dataset.d));
    });
  });
  list.querySelectorAll('.cd-rm').forEach(function(btn) {
    btn.addEventListener('click', function() {
      removeFromCart(parseInt(btn.dataset.id));
    });
  });

  var total = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  var totEl = document.getElementById('cd-tot-val');
  if (totEl) totEl.textContent = 'EGP ' + total.toLocaleString();

  /* Mini summary rows in footer */
  var sumEl = document.getElementById('cd-summary');
  if (sumEl) {
    sumEl.innerHTML = cart.map(function(it) {
      var name = LANG === 'ar' ? it.nameAr : it.nameEn;
      return '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:3px 0;color:var(--muted)">' +
        '<span>' + name + ' &times; ' + it.qty + '</span>' +
        '<span style="color:var(--cream)">EGP ' + (it.price * it.qty).toLocaleString() + '</span>' +
      '</div>';
    }).join('');
  }
}

/* ── CART DRAWER OPEN / CLOSE ── */
function openCart() {
  document.getElementById('cart-drw').classList.add('on');
  document.getElementById('cart-ov').classList.add('on');
  renderCart();
}
function closeCart() {
  document.getElementById('cart-drw').classList.remove('on');
  document.getElementById('cart-ov').classList.remove('on');
}

/* ── TOAST ── */
function showToast(msg) {
  var el = document.getElementById('toast');
  var txt = document.getElementById('toast-txt');
  if (!el) return;
  if (txt) txt.textContent = msg || (LANG === 'ar' ? 'تمت الإضافة للسلة ✓' : 'Added to cart ✓');
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(function() { el.classList.remove('show'); }, 2800);
}

/* ── ORDER MODAL ── */
function highlightPayment() {
  var cashLbl = document.getElementById('pay-cash-lbl');
  var visaLbl = document.getElementById('pay-visa-lbl');
  var paymentEl = document.querySelector('input[name="payment"]:checked');
  if (!cashLbl || !visaLbl || !paymentEl) return;
  cashLbl.style.borderColor = paymentEl.value === 'cash' ? 'var(--red)' : 'var(--border)';
  visaLbl.style.borderColor = paymentEl.value === 'visa' ? 'var(--red)' : 'var(--border)';
}

function populateModalSummary() {
  var itemsEl = document.getElementById('modal-order-items');
  var totalEl = document.getElementById('modal-total');
  if (!itemsEl || !totalEl) return;

  if (!cart.length) { itemsEl.innerHTML = '<div style="color:var(--muted);font-size:13px;padding:4px 0">السلة فارغة</div>'; return; }

  itemsEl.innerHTML = cart.map(function(it) {
    var name = LANG === 'ar' ? it.nameAr : it.nameEn;
    var sub  = (it.price * it.qty).toLocaleString();
    return '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--border)">' +
      '<div style="width:36px;height:36px;border-radius:7px;overflow:hidden;flex-shrink:0"><img src="' + it.img + '" style="width:100%;height:100%;object-fit:cover"/></div>' +
      '<div style="flex:1;min-width:0">' +
        '<div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + name + '</div>' +
        '<div style="font-size:11px;color:var(--muted)">EGP ' + it.price.toLocaleString() + ' &times; ' + it.qty + '</div>' +
      '</div>' +
      '<div style="font-weight:700;font-size:13px;color:var(--orange);flex-shrink:0">EGP ' + sub + '</div>' +
    '</div>';
  }).join('');

  var total = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  totalEl.textContent = 'EGP ' + total.toLocaleString();
}

function showOrderForm() {
  if (!cart.length) { openCart(); return; }
  populateModalSummary();
  highlightPayment();
  document.getElementById('order-modal').style.display = 'flex';
}
function closeOrderForm() {
  document.getElementById('order-modal').style.display = 'none';
}

function submitOrder() {
  var name    = document.getElementById('order-name').value.trim();
  var phone   = document.getElementById('order-phone').value.trim();
  var address = document.getElementById('order-address').value.trim();
  var area    = document.getElementById('order-area').value.trim();

  /* Validate */
  var missing = false;
  ['order-name','order-phone','order-address','order-area'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--red)';
      el.addEventListener('input', function() { el.style.borderColor = ''; }, {once:true});
      missing = true;
    }
  });
  if (missing) {
    alert(LANG === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
    return;
  }

  var btn = document.getElementById('submit-order-btn');
  btn.disabled = true;
  btn.textContent = LANG === 'ar' ? '⏳ جاري الإرسال...' : '⏳ Sending...';
  btn.style.opacity = '0.7';

  /* ── CRITICAL: Snapshot cart & form BEFORE clearing anything ── */
  var cartSnapshot = JSON.parse(JSON.stringify(cart));
  var paymentEl = document.querySelector('input[name="payment"]:checked');
  var orderData = {
    name:    name,
    phone:   phone,
    address: address,
    area:    area,
    notes:   document.getElementById('order-notes').value.trim() || (LANG === 'ar' ? 'لا يوجد' : 'None'),
    payment: paymentEl ? paymentEl.value : 'cash'
  };

  setTimeout(function() {
    /* Clear cart */
    cart = [];
    saveCart();
    renderCart();
    updateCount();

    /* Close modals */
    closeOrderForm();
    closeCart();

    /* Reset form */
    ['order-name','order-phone','order-address','order-area','order-notes'].forEach(function(id) {
      document.getElementById(id).value = '';
    });
    var cashRadio = document.querySelector('input[name="payment"][value="cash"]');
    if (cashRadio) cashRadio.checked = true;

    /* Reset button */
    btn.disabled = false;
    btn.innerHTML = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#fff;flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> إرسال عبر واتساب';
    btn.style.opacity = '1';

    /* Success feedback */
    showToast(LANG === 'ar' ? '🎉 تم إرسال طلبك!' : '🎉 Order sent!');

    /* Send WhatsApp with snapshotted data */
    sendWhatsApp(cartSnapshot, orderData);
  }, 600);
}

/* ── WHATSAPP MESSAGE ── */
function sendWhatsApp(cartSnap, order) {
  if (!cartSnap.length) return;
  var lines = cartSnap.map(function(i) {
    return '\u2022 ' + (LANG === 'ar' ? i.nameAr : i.nameEn) + ' \u00d7' + i.qty + ' = EGP ' + (i.price * i.qty).toLocaleString();
  }).join('\n');
  var total = cartSnap.reduce(function(s,i) { return s + i.price * i.qty; }, 0);
  var payText = order.payment === 'cash' ? '\u0643\u0627\u0634 \uD83D\uDCB5' : '\u0641\u064a\u0632\u0627 \uD83D\uDCB3';

  var msg = '\uD83C\uDF55 *\u0637\u0644\u0628 \u062C\u062F\u064A\u062F \u0645\u0646 Pizzeria*\n\n' +
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n' +
    '\uD83D\uDCCB *\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:*\n' + lines + '\n\n' +
    '\uD83D\uDCB0 *\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: EGP ' + total.toLocaleString() + '*\n\n' +
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n' +
    '\uD83D\uDC64 *\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0645\u064A\u0644:*\n' +
    '\u2022 \u0627\u0644\u0627\u0633\u0645: ' + order.name + '\n' +
    '\u2022 \u0627\u0644\u0647\u0627\u062A\u0641: ' + order.phone + '\n' +
    '\u2022 \u0627\u0644\u0639\u0646\u0648\u0627\u0646: ' + order.address + '\n' +
    '\u2022 \u0627\u0644\u0645\u0646\u0637\u0642\u0629: ' + order.area + '\n' +
    '\u2022 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639: ' + payText + '\n' +
    '\u2022 \u0645\u0644\u0627\u062D\u0638\u0627\u062A: ' + order.notes + '\n\n' +
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n' +
    '\u0634\u0643\u0631\u0627\u064B \u0644\u0643! \uD83D\uDE4F';

  window.open('https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(msg), '_blank');
}

/* ── RENDER FLAVORS ── uses data-addid instead of inline onclick with JSON ── */
function renderFlavors() {
  var grid = document.getElementById('flav-grid');
  if (!grid) return;
  grid.innerHTML = FLAVORS.map(function(p) {
    var badge = p.bc ? '<div class="flav-badge ' + p.bc + '">' + t(p.badge) + '</div>' : '';
    return '<div class="flav-card">' +
      '<div class="flav-img">' +
        '<img src="' + p.img + '" alt="' + t(p.name) + '" loading="lazy"/>' +
        '<div class="flav-over"></div>' +
        badge +
      '</div>' +
      '<div class="flav-body">' +
        '<div class="flav-name">' + t(p.name) + '</div>' +
        '<div class="flav-desc">' + t(p.desc) + '</div>' +
        '<div class="flav-foot">' +
          '<div><div class="flav-price">EGP ' + p.price + '</div><div class="flav-cur">' + (LANG==='ar'?'جنيه مصري':'Egyptian Pounds') + '</div></div>' +
          '<button class="add-btn" data-addid="' + p.id + '">+</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  grid.querySelectorAll('[data-addid]').forEach(function(btn) {
    btn.addEventListener('click', function() { addToCart(parseInt(btn.dataset.addid)); });
  });
}

/* ── RENDER MENU TABS ── */
function renderTabs() {
  var bar = document.getElementById('tab-bar');
  if (!bar) return;
  bar.innerHTML = Object.keys(MENU).map(function(k) {
    return '<button class="tab' + (k===activeCat?' on':'') + '" data-cat="' + k + '">' + t(MENU[k]) + '</button>';
  }).join('');
  bar.querySelectorAll('[data-cat]').forEach(function(btn) {
    btn.addEventListener('click', function() { setTab(btn.dataset.cat); });
  });
}

function setTab(k) { activeCat = k; renderTabs(); renderMenuGrid(); }

function renderMenuGrid() {
  var grid = document.getElementById('menu-grid');
  if (!grid) return;
  var tagMap = {
    pop:   '⭐ ' + (LANG==='ar'?'الأكثر طلباً':'Popular'),
    spicy: '🌶 ' + (LANG==='ar'?'حار':'Spicy'),
    veg:   '🌱 ' + (LANG==='ar'?'نباتي':'Veg')
  };
  grid.innerHTML = MENU[activeCat].items.map(function(it) {
    var tag = it.t ? '<span class="m-tag ' + it.t + '">' + (tagMap[it.t]||'') + '</span>' : '';
    return '<div class="m-card">' +
      '<div class="m-img"><img src="' + it.img + '" alt="' + t(it.name) + '" loading="lazy"/></div>' +
      '<div class="m-body">' +
        tag +
        '<div class="m-name">' + t(it.name) + '</div>' +
        '<div class="m-desc">' + t(it.desc) + '</div>' +
        '<div class="m-foot">' +
          '<div><div class="m-price">EGP ' + it.price + '</div></div>' +
          '<button class="add-btn" data-addid="' + it.id + '">+</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  grid.querySelectorAll('[data-addid]').forEach(function(btn) {
    btn.addEventListener('click', function() { addToCart(parseInt(btn.dataset.addid)); });
  });
}

/* ── RENDER GALLERY ── */
function renderGallery() {
  var grid = document.getElementById('gal-grid');
  if (!grid) return;
  grid.innerHTML = GALLERY.map(function(url, i) {
    return '<div class="g-item"><img src="' + url + '" alt="Pizzeria photo ' + (i+1) + '" loading="lazy"/><div class="g-dark"></div></div>';
  }).join('');
}

/* ── RENDER REVIEWS ── */
function renderReviews() {
  var grid = document.getElementById('rev-grid');
  if (!grid) return;
  grid.innerHTML = REVIEWS.map(function(r) {
    return '<div class="rev-card">' +
      '<div class="rev-top">' +
        '<div class="rev-av">' + r.n[0] + '</div>' +
        '<div><div class="rev-name">' + r.n + '</div><div class="rev-date">' + t(r.d) + '</div></div>' +
        '<div class="rev-gl"><svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></div>' +
      '</div>' +
      '<div class="rev-stars">' + '★'.repeat(r.s) + '</div>' +
      '<div class="rev-txt">"' + t(r.t) + '"</div>' +
    '</div>';
  }).join('');
}

/* ── RENDER ALL ── */
function renderAll() {
  renderFlavors();
  renderTabs();
  renderMenuGrid();
  renderGallery();
  renderReviews();
  renderCart();
  setTimeout(observeReveal, 60);
}

/* ── CONTACT FORM ── */
function sendContactMessage() {
  var name    = document.getElementById('contact-name').value.trim();
  var phone   = document.getElementById('contact-phone').value.trim();
  var message = document.getElementById('contact-message').value.trim();
  if (!name || !phone || !message) { alert('يرجى ملء جميع الحقول'); return; }
  var msg = 'مرحباً! لدي استفسار 📝\n\n👤 الاسم: ' + name + '\n📞 الهاتف: ' + phone + '\n💬 الرسالة: ' + message;
  window.open('https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(msg), '_blank');
}

/* ── MOBILE NAV ── */
function closeMob() { document.getElementById('mob-nav').classList.remove('open'); }

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('stuck', window.scrollY > 60);
});

/* ── SCROLL REVEAL ── */
var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('vis'); });
}, {threshold: 0.1});
function observeReveal() {
  document.querySelectorAll('.rv:not(.vis)').forEach(function(el) { io.observe(el); });
}

/* ── KEYBOARD: ESC closes everything ── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeCart(); closeOrderForm(); closeMob(); }
});
/* ── INIT (DOMContentLoaded) ── */
document.addEventListener('DOMContentLoaded', function() {

  /* 1. Restore cart badge immediately from localStorage */
  updateCount();

  /* 2. Preloader progress bar */
  var _p = 0;
  var _fill = document.getElementById('pfill');
  var _tick = setInterval(function() {
    _p += Math.random() * 16 + 4;
    if (_p >= 100) {
      _p = 100;
      clearInterval(_tick);
      setTimeout(function() {
        var pre = document.getElementById('preloader');
        if (pre) pre.classList.add('gone');
        /* 3. Set language → triggers renderAll() which builds all grids & attaches all event listeners */
        setLang('ar');
      }, 300);
    }
    if (_fill) _fill.style.width = _p + '%';
  }, 90);

});
