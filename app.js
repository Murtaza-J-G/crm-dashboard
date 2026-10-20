const $ = (s) => document.querySelector(s);
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fa = (n) => Number(n || 0).toLocaleString("fa-AF");
const fd = (d) => {
  try {
    return d ? new Date(d).toLocaleDateString("fa-AF-u-ca-persian") : "—";
  } catch (e) {
    return d || "—";
  }
};
const today = () => new Date().toISOString().slice(0, 10);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

const M = {
  customers: {
    t: "مشتریان",
    one: "مشتری",
    ico: "👥",
    f: [
      { k: "name", l: "نام و تخلص", req: 1 },
      { k: "phone", l: "شماره تلفن", type: "tel", req: 1 },
      { k: "city", l: "شهر / ولایت" },
      { k: "email", l: "ایمیل", type: "email" },
      { k: "address", l: "آدرس", full: 1 },
      { k: "note", l: "یادداشت", type: "textarea", full: 1 },
    ],
    cols: ["name", "phone", "city", "note"],
  },
  purchases: {
    t: "خریدها",
    one: "خرید",
    ico: "🛒",
    f: [
      { k: "customer", l: "مشتری", ref: "customers", req: 1 },
      { k: "product", l: "مدل موبایل", req: 1 },
      { k: "qty", l: "تعداد", type: "number", def: 1 },
      { k: "price", l: "مبلغ کل (افغانی)", type: "number", req: 1 },
      { k: "date", l: "تاریخ خرید", type: "date", def: "today" },
      {
        k: "pay",
        l: "نوع پرداخت",
        opt: ["نقد", "قسطی", "کارت بانکی"],
        tone: ["bg", "bw", "bb"],
      },
    ],
    cols: ["customer", "product", "qty", "price", "date", "pay"],
  },
  leads: {
    t: "مشتریان احتمالی",
    one: "مشتری احتمالی",
    ico: "🎯",
    f: [
      { k: "name", l: "نام", req: 1 },
      { k: "phone", l: "شماره تلفن", type: "tel", req: 1 },
      { k: "model", l: "موبایل مورد علاقه" },
      {
        k: "source",
        l: "منبع آشنایی",
        opt: ["فیسبوک", "واتساپ", "معرفی دوستان", "مراجعه حضوری", "دیگر"],
      },
      {
        k: "status",
        l: "وضعیت",
        opt: ["جدید", "در حال پیگیری", "آماده خرید", "از دست رفته"],
        tone: ["bb", "bw", "bg", "br"],
      },
      { k: "next", l: "تاریخ پیگیری بعدی", type: "date" },
      { k: "note", l: "یادداشت", type: "textarea", full: 1 },
    ],
    cols: ["name", "phone", "model", "status", "next"],
  },
  contacts: {
    t: "تماس‌ها و پیام‌ها",
    one: "تماس / پیام",
    ico: "💬",
    f: [
      { k: "who", l: "مشتری یا شخص", req: 1, list: 1 },
      {
        k: "type",
        l: "نوع",
        opt: ["تماس تلفنی", "پیامک", "واتساپ", "حضوری"],
        tone: ["bb", "bn", "bg", "bw"],
      },
      { k: "dir", l: "جهت", opt: ["خروجی", "ورودی"] },
      { k: "date", l: "تاریخ", type: "date", def: "today" },
      { k: "note", l: "خلاصه گفتگو", type: "textarea", full: 1, req: 1 },
    ],
    cols: ["who", "type", "dir", "date", "note"],
  },
  sales: {
    t: "مدیریت فروش",
    one: "فرصت فروش",
    ico: "💼",
    f: [
      { k: "customer", l: "مشتری", ref: "customers", req: 1 },
      { k: "product", l: "محصول", req: 1 },
      { k: "amount", l: "مبلغ پیش‌بینی (افغانی)", type: "number" },
      {
        k: "stage",
        l: "مرحله",
        opt: ["مذاکره", "پیشنهاد قیمت", "فروش نهایی", "لغو شد"],
        tone: ["bn", "bw", "bg", "br"],
      },
      { k: "date", l: "تاریخ", type: "date", def: "today" },
    ],
    cols: ["customer", "product", "amount", "stage", "date"],
  },
  complaints: {
    t: "شکایت‌ها",
    one: "شکایت",
    ico: "⚠️",
    f: [
      { k: "customer", l: "مشتری", ref: "customers", req: 1 },
      { k: "subject", l: "موضوع", req: 1 },
      {
        k: "priority",
        l: "اولویت",
        opt: ["کم", "متوسط", "بالا"],
        tone: ["bn", "bw", "br"],
      },
      {
        k: "status",
        l: "وضعیت",
        opt: ["باز", "در حال بررسی", "حل شد"],
        tone: ["br", "bw", "bg"],
      },
      { k: "date", l: "تاریخ", type: "date", def: "today" },
      { k: "desc", l: "شرح شکایت", type: "textarea", full: 1 },
    ],
    cols: ["customer", "subject", "priority", "status", "date"],
  },
};

function seed() {
  const c = [
    {
      id: "c1",
      name: "احمد رضایی",
      phone: "0700123456",
      city: "کابل",
      note: "خریدار دایمی",
    },
    {
      id: "c2",
      name: "مریم احمدی",
      phone: "0788654321",
      city: "هرات",
      note: "",
    },
  ];
  return {
    customers: c,
    purchases: [
      {
        id: "p1",
        customer: "c1",
        product: "Samsung Galaxy A54",
        qty: 1,
        price: 18500,
        date: today(),
        pay: "نقد",
      },
    ],
    leads: [
      {
        id: "l1",
        name: "نصیر کریمی",
        phone: "0799111222",
        model: "iPhone 13",
        source: "واتساپ",
        status: "در حال پیگیری",
        next: today(),
        note: "",
      },
    ],
    contacts: [
      {
        id: "t1",
        who: "احمد رضایی",
        type: "تماس تلفنی",
        dir: "خروجی",
        date: today(),
        note: "اطلاع از ورود مدل جدید",
      },
    ],
    sales: [
      {
        id: "s1",
        customer: "c2",
        product: "Xiaomi Redmi Note 12",
        amount: 12000,
        stage: "پیشنهاد قیمت",
        date: today(),
      },
    ],
    complaints: [
      {
        id: "q1",
        customer: "c1",
        subject: "مشکل شارژ گوشی",
        priority: "بالا",
        status: "باز",
        date: today(),
        desc: "بعد از یک هفته شارژ نمی‌شود.",
      },
    ],
  };
}
let db;
try {
  db = JSON.parse(localStorage.getItem("crm-mobile"));
} catch (e) {}
if (!db || !db.customers) db = seed();
const save = () => {
  try {
    localStorage.setItem("crm-mobile", JSON.stringify(db));
  } catch (e) {}
};
let cur = "dashboard";
const toast = (m) => {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("on");
  setTimeout(() => t.classList.remove("on"), 1800);
};
const cname = (id) => (db.customers.find((c) => c.id === id) || {}).name || "—";

function cell(f, v) {
  if (f.ref) return esc(cname(v));
  if (f.type === "date") return fd(v);
  if (f.type === "number") return fa(v);
  if (f.opt) {
    const i = f.opt.indexOf(v);
    return `<span class="bd ${(f.tone || [])[i] ? "b" + f.tone[i].slice(1) : "bn"}">${esc(v)}</span>`.replace(
      /class="bd (b)(\w+)"/,
      (m, a, b) => `class="bd b${b}"`,
    );
  }
  return esc(v || "—");
}
function nav() {
  $("#nav").innerHTML = [["dashboard", "داشبورد", "📊"]]
    .concat(Object.keys(M).map((k) => [k, M[k].t, M[k].ico]))
    .map(
      ([k, t, i]) =>
        `<button data-k="${k}" class="${k === cur ? "on" : ""}">${i} ${t}${M[k] ? `<b>${fa(db[k].length)}</b>` : ""}</button>`,
    )
    .join("");
}
function render() {
  nav();
  $("#q").value = "";
  if (cur === "dashboard") {
    $("#ttl").textContent = "داشبورد";
    $("#q").style.display = "none";
    $("#add").style.display = "none";
    return dash();
  }
  $("#q").style.display = "";
  $("#add").style.display = "";
  const m = M[cur];
  $("#ttl").textContent = m.t;
  $("#add").textContent = "＋ ثبت " + m.one;
  table();
}
function table() {
  const m = M[cur],
    q = $("#q").value.trim().toLowerCase();
  const F = (k) => m.f.find((f) => f.k === k);
  let rows = db[cur].filter(
    (r) =>
      !q ||
      m.f.some((f) =>
        String(f.ref ? cname(r[f.k]) : r[f.k] || "")
          .toLowerCase()
          .includes(q),
      ),
  );
  if (!rows.length) {
    $("#view").innerHTML =
      `<div class="tw"><div class="empty">${q ? "نتیجه‌ای پیدا نشد." : "هنوز چیزی ثبت نشده. با دکمه «ثبت " + m.one + "» شروع کنید."}</div></div>`;
    return;
  }
  $("#view").innerHTML =
    `<div class="tw"><table><thead><tr>${m.cols.map((c) => `<th>${F(c).l}</th>`).join("")}<th></th></tr></thead><tbody>${rows
      .slice()
      .reverse()
      .map(
        (r) =>
          `<tr>${m.cols.map((c) => `<td>${cell(F(c), r[c])}</td>`).join("")}<td class="a">${cur === "customers" ? `<button class="btn g s" data-p="${r.id}">پرونده</button> ` : ""}<button class="btn g s" data-e="${r.id}">ویرایش</button> <button class="btn d s" data-d="${r.id}">حذف</button></td></tr>`,
      )
      .join("")}</tbody></table></div>`;
}
function dash() {
  const sum = (a, k) => a.reduce((s, x) => s + Number(x[k] || 0), 0);
  const open = db.sales.filter(
    (s) => !["فروش نهایی", "لغو شد"].includes(s.stage),
  );
  const oc = db.complaints.filter((c) => c.status !== "حل شد");
  const fu = db.leads
    .filter((l) => l.next && l.next <= today() && l.status !== "از دست رفته")
    .sort((a, b) => (a.next > b.next ? 1 : -1));
  const st = M.leads.f.find((f) => f.k === "status").opt,
    mx = Math.max(
      1,
      ...st.map((s) => db.leads.filter((l) => l.status === s).length),
    );
  $("#view").innerHTML = `<div class="stats">
 <div class="st"><small>تعداد مشتریان</small><div>${fa(db.customers.length)}</div></div>
 <div class="st k"><small>مجموع فروش (افغانی)</small><div>${fa(sum(db.purchases, "price"))}</div></div>
 <div class="st w"><small>فرصت‌های فروش باز</small><div>${fa(open.length)}</div></div>
 <div class="st r"><small>شکایت‌های باز</small><div>${fa(oc.length)}</div></div></div>
 <div class="grid">
 <div class="card"><h3>پیگیری‌های امروز و عقب‌افتاده</h3>${fu.length ? fu.map((l) => `<div class="li"><div>${esc(l.name)}<small>${esc(l.phone)} · ${esc(l.model || "")}</small></div><span class="bd bw">${fd(l.next)}</span></div>`).join("") : '<div class="empty">پیگیری معلقی ندارید.</div>'}</div>
 <div class="card"><h3>مشتریان احتمالی بر اساس وضعیت</h3>${st
   .map((s) => {
     const n = db.leads.filter((l) => l.status === s).length;
     return `<div class="bar"><span>${s}</span><i style="width:${(n / mx) * 60}%"></i><b>${fa(n)}</b></div>`;
   })
   .join("")}</div>
 <div class="card"><h3>شکایت‌های باز</h3>${
   oc.length
     ? oc
         .slice(0, 5)
         .map(
           (c) =>
             `<div class="li"><div>${esc(c.subject)}<small>${esc(cname(c.customer))}</small></div>${cell(M.complaints.f[2], c.priority)}</div>`,
         )
         .join("")
     : '<div class="empty">شکایت بازی نیست.</div>'
 }</div>
 <div class="card"><h3>آخرین تماس‌ها و پیام‌ها</h3>${
   db.contacts.length
     ? db.contacts
         .slice(-5)
         .reverse()
         .map(
           (c) =>
             `<div class="li"><div>${esc(c.who)}<small>${esc(c.note)}</small></div><small>${fd(c.date)}</small></div>`,
         )
         .join("")
     : '<div class="empty">تماسی ثبت نشده.</div>'
 }</div>
 </div>`;
}
function form(id) {
  const m = M[cur],
    r = id ? db[cur].find((x) => x.id === id) : {};
  const dl =
    cur === "contacts"
      ? `<datalist id="wl">${db.customers
          .concat(db.leads)
          .map((x) => `<option value="${esc(x.name)}">`)
          .join("")}</datalist>`
      : "";
  const inp = (f) => {
    const v =
      r[f.k] ??
      (f.def === "today" ? today() : (f.def ?? (f.opt ? f.opt[0] : "")));
    if (f.ref)
      return `<select name="${f.k}" ${f.req ? "required" : ""}><option value="">انتخاب کنید…</option>${db[f.ref].map((o) => `<option value="${o.id}" ${o.id === v ? "selected" : ""}>${esc(o.name)}</option>`).join("")}</select>`;
    if (f.opt)
      return `<select name="${f.k}">${f.opt.map((o) => `<option ${o === v ? "selected" : ""}>${o}</option>`).join("")}</select>`;
    if (f.type === "textarea")
      return `<textarea name="${f.k}" rows="3" ${f.req ? "required" : ""}>${esc(v)}</textarea>`;
    return `<input name="${f.k}" type="${f.type || "text"}" value="${esc(v)}" ${f.req ? "required" : ""} ${f.list ? 'list="wl"' : ""} ${f.type === "tel" ? 'dir="ltr" style="text-align:right"' : ""}>`;
  };
  $("#dlg").innerHTML =
    `<form method="dialog" id="fm"><h2>${id ? "ویرایش" : "ثبت"} ${m.one}</h2><div class="fg">${m.f.map((f) => `<label class="${f.full ? "f" : ""}">${f.l}${f.req ? " *" : ""}${inp(f)}</label>`).join("")}</div>${dl}<div class="acts"><button type="button" class="btn g" id="cx">انصراف</button><button class="btn">ذخیره</button></div></form>`;
  $("#dlg").showModal();
  $("#cx").onclick = () => $("#dlg").close();
  $("#fm").onsubmit = (e) => {
    const d = Object.fromEntries(new FormData(e.target));
    if (id) Object.assign(r, d);
    else db[cur].push({ id: uid(), ...d });
    save();
    render();
    toast("ذخیره شد");
  };
}
function profile(id) {
  const c = db.customers.find((x) => x.id === id);
  const L = (a, fn) =>
    a.length
      ? a.map(fn).join("")
      : '<div class="li"><small>موردی نیست</small></div>';
  const P = db.purchases.filter((p) => p.customer === id),
    C = db.contacts.filter((t) => t.who === c.name),
    Q = db.complaints.filter((q) => q.customer === id);
  $("#dlg").innerHTML =
    `<div class="pf"><h2>${esc(c.name)}</h2><div class="li"><span dir="ltr">${esc(c.phone)}</span><span>${esc(c.city || "")}</span></div>
 <h3>خریدها · ${fa(P.reduce((s, p) => s + Number(p.price), 0))} افغانی</h3>${L(P, (p) => `<div class="li"><span>${esc(p.product)}</span><small>${fd(p.date)}</small></div>`)}
 <h3>تماس‌ها و پیام‌ها</h3>${L(C, (t) => `<div class="li"><span>${esc(t.note)}</span><small>${fd(t.date)}</small></div>`)}
 <h3>شکایت‌ها</h3>${L(Q, (q) => `<div class="li"><span>${esc(q.subject)}</span>${cell(M.complaints.f[3], q.status)}</div>`)}
 <div class="acts"><button class="btn" onclick="dlg.close()">بستن</button></div></div>`;
  $("#dlg").showModal();
}
$("#nav").onclick = (e) => {
  const b = e.target.closest("button");
  if (b) {
    cur = b.dataset.k;
    render();
  }
};
$("#add").onclick = () => form();
$("#q").oninput = table;
$("#view").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.e) form(b.dataset.e);
  if (b.dataset.p) profile(b.dataset.p);
  if (b.dataset.d && confirm("این مورد حذف شود؟")) {
    db[cur] = db[cur].filter((x) => x.id !== b.dataset.d);
    save();
    render();
    toast("حذف شد");
  }
};
$("#reset").onclick = () => {
  if (confirm("همه داده‌ها حذف شوند؟")) {
    db = {
      customers: [],
      purchases: [],
      leads: [],
      contacts: [],
      sales: [],
      complaints: [],
    };
    save();
    render();
  }
};
render();
