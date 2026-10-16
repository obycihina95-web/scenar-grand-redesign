/* СКЭНАР-ГРАНД · общий скрипт: меню, запись, голосовой поиск */
(function () {
  "use strict";

  /* ---------- индекс поиска ---------- */
  const C = { treat: "#00A3D3", diag: "#6EBE4D", school: "#FF8562", shop: "#073B52", read: "#9aa7b0" };
  const INDEX = [
    // услуги — лечение
    { g: "Лечение", c: C.treat, t: "СКЭНАР-терапия", d: "1 сеанс · аппарат с биологической обратной связью", p: "2 000 ₽", u: "uslugi.html#lechenie", k: "скэнар терапия лечение боль спина поясница позвоночник грыжа шея суставы колено мышцы кашель горло голова восстановление сеанс" },
    { g: "Лечение", c: C.treat, t: "Лечение МОНИКОРом по симптомо-комплексам", d: "1 сеанс", p: "2 000 ₽", u: "uslugi.html#lechenie", k: "моникор лечение симптомы комплекс" },
    { g: "Лечение", c: C.treat, t: "Резонансно-частотное лечение от инфекций и паразитов", d: "1 сеанс", p: "1 500 ₽", u: "uslugi.html#lechenie", k: "паразиты глисты инфекции вирусы резонанс лямблии" },
    { g: "Лечение", c: C.treat, t: "Индукционная терапия", d: "Стресс, депрессия, бессонница · 1 сеанс", p: "1 500 ₽", u: "uslugi.html#lechenie", k: "стресс депрессия бессонница сон нервы тревога память индукционная" },
    { g: "Лечение", c: C.treat, t: "Лечебное одеяло", d: "1 сеанс", p: "700 ₽", u: "uslugi.html#lechenie", k: "одеяло прогревание" },
    // диагностика
    { g: "Диагностика", c: C.diag, t: "РОФЕС-МОНИКОР: диагностика всех органов", d: "С одновременным исправлением найденных нарушений", p: "3 000 ₽", u: "uslugi.html#diagnostika", k: "диагностика органы обследование моникор рофес проверка" },
    { g: "Диагностика", c: C.diag, t: "Вегетативно-резонансная диагностика на паразитов", d: "ВРТ, вега-тест", p: "3 000 ₽", u: "uslugi.html#diagnostika", k: "врт паразиты глисты диагностика вега тест инфекции" },
    { g: "Диагностика", c: C.diag, t: "Контрольная ВРТ-диагностика", d: "1 сеанс", p: "1 500 ₽", u: "uslugi.html#diagnostika", k: "контрольная врт повторная диагностика" },
    // консультации и школа
    { g: "Консультации и обучение", c: C.school, t: "Консультация врача · 15 минут", d: "Короткий разбор запроса", p: "1 000 ₽", u: "uslugi.html#konsultacii", k: "консультация врач прием запись вопрос" },
    { g: "Консультации и обучение", c: C.school, t: "Консультация врача · 1 час", d: "Подробный разбор и план лечения", p: "2 000 ₽", u: "uslugi.html#konsultacii", k: "консультация врач прием час план" },
    { g: "Консультации и обучение", c: C.school, t: "Онлайн-консультация", d: "Ответы на вопросы дистанционно", p: "2 000 ₽", u: "magazin.html#konsult", k: "онлайн консультация дистанционно удаленно другой город" },
    { g: "Консультации и обучение", c: C.school, t: "Школа СКЭНАР-терапии для домашних пользователей", d: "Базовые и тематические школы", p: "15 000 ₽", u: "shkola.html", k: "школа обучение курс семинар научиться дома пользоваться аппаратом мастер-класс" },
    // симптомы → системы
    { g: "Что беспокоит", c: C.treat, t: "Опорно-двигательная система", d: "Остеохондроз, грыжи, артроз, боли в спине и суставах", u: "index.html#sys-opora", k: "спина поясница шея позвоночник грыжа протрузия остеохондроз сустав колено артроз артрит радикулит сколиоз миозит нога" },
    { g: "Что беспокоит", c: C.treat, t: "Нервная система", d: "Головные боли, ВСД, невриты, бессонница", u: "index.html#sys-nerv", k: "голова головная мигрень всд невралгия неврит инсульт бессонница память паркинсон судороги" },
    { g: "Что беспокоит", c: C.treat, t: "Дыхательная система", d: "Бронхит, астма, кашель, гайморит, отит", u: "index.html#sys-dyh", k: "кашель бронхит астма пневмония горло насморк гайморит синусит отит ухо нос ринит аденоиды" },
    { g: "Что беспокоит", c: C.treat, t: "Сердечно-сосудистая система", d: "Гипертония, аритмия, стенокардия", u: "index.html#sys-cardio", k: "сердце давление гипертония гипотония аритмия стенокардия сосуды атеросклероз" },
    { g: "Что беспокоит", c: C.treat, t: "Пищеварительная система", d: "Гастрит, колит, печень, диабет 2 типа", u: "index.html#sys-pishch", k: "желудок живот гастрит кишечник колит печень гепатит холецистит диабет вес похудение жкт" },
    { g: "Что беспокоит", c: C.treat, t: "Иммунная система", d: "Аллергии, частые простуды, ангина", u: "index.html#sys-immun", k: "иммунитет аллергия простуда ангина орви часто болеет ребенок дети" },
    { g: "Что беспокоит", c: C.treat, t: "Мочеполовая система", d: "Простатит, цистит, эндометриоз, климакс", u: "index.html#sys-moche", k: "цистит простатит почки эндометриоз климакс бесплодие мастопатия гинекология" },
    { g: "Что беспокоит", c: C.treat, t: "Эндокринная система", d: "Тиреоидит, щитовидная железа", u: "index.html#sys-endo", k: "щитовидная железа тиреоидит эндокринная гормоны" },
    { g: "Что беспокоит", c: C.diag, t: "Паразитозы и инфекции", d: "Диагностика и устранение без химии", u: "index.html#sys-paraz", k: "паразиты глисты инфекции вирусы стафилококк стрептококк лямблии" },
    // магазин
    { g: "Магазин", c: C.shop, t: "Аппарат ЧЭНС-01 СКЭНАР-М (флагман)", d: "Самый функциональный в домашней серии", p: "16 000 ₽", u: "magazin.html#apparaty", k: "аппарат купить скэнар-м домашний прибор" },
    { g: "Магазин", c: C.shop, t: "Аппарат СКЭНАР-1 НТ (исполнение 02.2)", d: "Профессиональная линейка", p: "55 000 ₽", u: "magazin.html#apparaty", k: "аппарат купить профессиональный нт прибор" },
    { g: "Магазин", c: C.shop, t: "Выносные электроды", d: "Пешки, Гребенчатый, Карандаши, Лицевой, Улитка, Блинчики КонНика", p: "от 2 700 ₽", u: "magazin.html#elektrody", k: "электрод электроды пешки гребенчатый карандаши лицевой улитка блинчики браслеты кабель" },
    { g: "Магазин", c: C.shop, t: "PDF-методика «Барашки»", d: "При кашле любого происхождения", p: "690 ₽", u: "magazin.html#metodiki", k: "барашки кашель методика pdf бронхит" },
    { g: "Магазин", c: C.shop, t: "PDF-методика «Ёлочка»", d: "Боль в горле, температура у ребёнка", p: "690 ₽", u: "magazin.html#metodiki", k: "елочка ёлочка горло температура ребенок простуда методика pdf" },
    { g: "Магазин", c: C.shop, t: "Руководство по лечению пяточной шпоры", d: "10-дневный план воздействий", p: "1 490 ₽", u: "magazin.html#metodiki", k: "пяточная шпора пятка стопа руководство pdf" },
    // статьи
    { g: "Статьи", c: C.read, t: "Что такое СКЭНАР-терапия?", d: "Принципы и физиологические основы", u: "statya.html", k: "что такое скэнар терапия принцип как работает" },
    { g: "Статьи", c: C.read, t: "ВРТ — медицина третьего тысячелетия", d: "Вегетативный резонансный тест", u: "stati.html", k: "врт вега тест резонанс" },
    { g: "Статьи", c: C.read, t: "Моникор", d: "Система диагностики всех органов", u: "stati.html", k: "моникор диагностика" },
    { g: "Статьи", c: C.read, t: "Щитовидная железа", d: "Энергия, память, сердце, кишечник", u: "stati.html", k: "щитовидная железа" },
    { g: "Статьи", c: C.read, t: "Остеохондроз", d: "Почему болит позвоночник", u: "stati.html", k: "остеохондроз позвоночник спина" },
    { g: "Статьи", c: C.read, t: "Регенерация хрящевой ткани: миф или реальность?", d: "Артроз, протрузии, грыжи", u: "stati.html", k: "хрящ артроз грыжа протрузия регенерация" },
    { g: "Статьи", c: C.read, t: "Пять факторов здоровья", d: "Почему без образа жизни результат временный", u: "stati.html", k: "здоровье образ жизни питание" },
    // страницы
    { g: "О центре", c: C.read, t: "Врачи центра", d: "К. В. Никитин и Т. А. Никитина", u: "o-nas.html", k: "врач доктор никитин никитина кто лечит специалисты" },
    { g: "О центре", c: C.read, t: "Отзывы пациентов", d: "Истории лечения", u: "otzyvy.html", k: "отзывы мнения истории" },
    { g: "О центре", c: C.read, t: "Контакты и как добраться", d: "Калининград, ул. Озёрная, 1 · Пн–Сб 10:00–16:00", u: "kontakty.html", k: "адрес контакты телефон где находится как добраться парковка часы работы" },
    { g: "О центре", c: C.read, t: "Политика возврата", d: "Гарантия 24 месяца на аппараты", u: "politika-vozvrata.html", k: "возврат гарантия ремонт сломался" }
  ];

  const norm = (s) => s.toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-я0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  // грубый русский стемминг: отрезаем окончания, чтобы «спине» нашло «спина»
  const stem = (w) => (w.length > 4 ? w.replace(/(ами|ями|ого|его|ому|ему|ыми|ими|ах|ях|ов|ев|ей|ой|ий|ый|ая|яя|ое|ее|ую|юю|ам|ям|ом|ем|ы|и|а|я|е|у|ю|о|ь)$/, "") : w);
  const STOP = new Set(["у", "меня", "мне", "болит", "боли", "боль", "что", "как", "и", "в", "на", "с", "по", "для", "не", "очень", "есть", "хочу", "можно", "ли", "это", "при"]);

  function search(q) {
    const words = norm(q).split(" ").filter((w) => w && !STOP.has(w)).map(stem);
    if (!words.length) return [];
    return INDEX.map((it) => {
      const hay = norm(it.t + " " + it.d + " " + it.k);
      let s = 0;
      words.forEach((w) => { if (w.length > 1 && hay.includes(w)) s += norm(it.t).includes(w) ? 3 : 1; });
      return { it, s };
    }).filter((r) => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 12).map((r) => r.it);
  }

  /* ---------- оверлей поиска ---------- */
  const ov = document.getElementById("searchOv");
  const sInput = document.getElementById("sInput");
  const sRes = document.getElementById("sResults");
  const sStatus = document.getElementById("sStatus");

  function render(q) {
    if (!sRes) return;
    const res = search(q);
    if (!q.trim()) { sRes.innerHTML = ""; return; }
    if (!res.length) {
      sRes.innerHTML = '<div class="s-empty"><b>Ничего не нашли по запросу «' + esc(q) + '».</b><br>Опишите проблему врачу — он подскажет, с чего начать.<br><br><button class="btn btn-coral btn-sm" data-book>Задать вопрос врачу</button></div>';
      return;
    }
    const groups = {};
    res.forEach((r) => (groups[r.g] = groups[r.g] || []).push(r));
    sRes.innerHTML = Object.keys(groups).map((g) =>
      '<div class="s-group"><h6>' + g + "</h6>" + groups[g].map((r) =>
        '<a class="s-item" href="' + r.u + '"><span class="dot2" style="background:' + r.c + '"></span><span><span class="t">' + esc(r.t) + '</span><br><span class="d">' + esc(r.d) + "</span></span>" + (r.p ? '<span class="p">' + r.p + "</span>" : "") + "</a>").join("") + "</div>").join("");
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m])); }

  function openSearch(q, voice) {
    if (!ov) return;
    ov.classList.add("open");
    document.body.style.overflow = "hidden";
    if (typeof q === "string") { sInput.value = q; render(q); }
    if (voice) startVoice(sInput, (txt) => render(txt)); else setTimeout(() => sInput.focus(), 50);
  }
  function closeSearch() { if (!ov) return; ov.classList.remove("open"); document.body.style.overflow = ""; stopVoice(); }

  if (sInput) sInput.addEventListener("input", () => render(sInput.value));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSearch(); closeModal(); closeDrawer(); }
    if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(""); }
  });
  if (ov) ov.addEventListener("click", (e) => { if (e.target === ov) closeSearch(); });

  /* ---------- голосовой ввод (Web Speech API) ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null, recBtn = null;
  function setStatus(t) { if (sStatus) sStatus.textContent = t; }
  function stopVoice() {
    if (rec) { try { rec.stop(); } catch (e) {} }
    document.querySelectorAll(".mic.listening").forEach((b) => b.classList.remove("listening"));
    document.body.classList.remove("listening-on");
  }
  function startVoice(input, onText, btn) {
    if (!SR) { setStatus("Голосовой ввод работает в Chrome, Edge, Safari и Яндекс Браузере. Напишите запрос текстом."); input.focus(); return; }
    stopVoice();
    rec = new SR();
    rec.lang = "ru-RU";
    rec.interimResults = true;
    rec.continuous = false;
    recBtn = btn || ov.querySelector(".mic");
    recBtn && recBtn.classList.add("listening");
    document.body.classList.add("listening-on");
    setStatus("Слушаю… Расскажите, что вас беспокоит. Например: «болит спина» или «кашель у ребёнка»");
    rec.onresult = (e) => {
      let txt = "";
      for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
      input.value = txt;
      onText && onText(txt);
    };
    rec.onerror = (e) => {
      setStatus(e.error === "not-allowed" ? "Разрешите доступ к микрофону в настройках браузера." : e.error === "no-speech" ? "Не расслышали. Нажмите на микрофон и повторите." : "Голосовой ввод недоступен. Напишите запрос текстом.");
      stopVoice();
    };
    rec.onend = () => { stopVoice(); if (input.value) setStatus("Вы сказали: «" + input.value + "»"); };
    try { rec.start(); } catch (e) { stopVoice(); }
  }

  // кнопки «микрофон» и строки поиска на странице
  document.querySelectorAll("[data-voice]").forEach((btn) => btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (btn.classList.contains("listening")) { stopVoice(); return; }
    if (btn.closest("#searchOv")) startVoice(sInput, render, btn);
    else openSearch("", true);
  }));
  document.querySelectorAll("[data-search]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); openSearch(el.dataset.search || ""); }));
  document.querySelectorAll("form[data-inline-search]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault(); openSearch(f.querySelector("input").value);
  }));
  document.querySelectorAll("[data-close-search]").forEach((b) => b.addEventListener("click", closeSearch));

  /* ---------- запись / заказ ---------- */
  const modal = document.getElementById("bookModal");
  function openModal(topic) {
    if (!modal) return;
    const f = modal.querySelector("form");
    f.classList.remove("sent");
    const sel = f.querySelector("select");
    if (topic && sel) {
      let opt = [...sel.options].find((o) => o.text === topic);
      if (!opt) { opt = new Option(topic, topic); sel.add(opt); }
      sel.value = opt.value;
    }
    closeSearch();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => f.querySelector("input").focus(), 60);
  }
  function closeModal() { if (!modal) return; modal.classList.remove("open"); document.body.style.overflow = ""; }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-book]");
    if (b) { e.preventDefault(); openModal(b.dataset.book); }
    if (e.target.closest("[data-close-modal]") || e.target === modal) closeModal();
  });
  document.querySelectorAll("form.form").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    // макет: здесь подключается отправка формы (Tilda / CRM / почта)
    f.classList.add("sent");
  }));

  /* ---------- мобильное меню ---------- */
  const drawer = document.getElementById("drawer");
  function closeDrawer() { if (drawer) { drawer.classList.remove("open"); document.body.style.overflow = ""; } }
  document.querySelectorAll("[data-menu]").forEach((b) => b.addEventListener("click", () => { drawer.classList.add("open"); document.body.style.overflow = "hidden"; }));
  document.querySelectorAll("[data-menu-close], #drawer nav a").forEach((b) => b.addEventListener("click", closeDrawer));

  /* ---------- шапка при скролле ---------- */
  const hdr = document.querySelector(".header");
  const onScroll = () => hdr && hdr.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- появление блоков ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  } else document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));

  /* ---------- навигатор по системам организма ---------- */
  const syss = document.querySelectorAll(".sys");
  function openSys(id) {
    syss.forEach((s) => {
      const on = s.dataset.sys === id && !s.classList.contains("open");
      s.classList.toggle("open", on);
      s.querySelector(".sys-btn").setAttribute("aria-expanded", on);
    });
    document.querySelectorAll(".hot").forEach((h) => h.classList.toggle("on", h.dataset.sys === id && document.querySelector('.sys[data-sys="' + id + '"]').classList.contains("open")));
  }
  syss.forEach((s) => s.querySelector(".sys-btn").addEventListener("click", () => openSys(s.dataset.sys)));
  function sysFromHash() {
    const m = location.hash.match(/^#sys-(\w+)/);
    if (!m || !syss.length) return;
    const el = document.getElementById("sys-" + m[1]);
    if (!el) return;
    if (!el.classList.contains("open")) openSys(m[1]);
    closeSearch();
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  }
  window.addEventListener("hashchange", sysFromHash); sysFromHash();
  document.querySelectorAll(".hot").forEach((h) => h.addEventListener("click", () => {
    openSys(h.dataset.sys);
    const el = document.querySelector('.sys[data-sys="' + h.dataset.sys + '"]');
    if (window.innerWidth < 900) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }));

  /* ---------- фильтры (магазин, отзывы, статьи, услуги) ---------- */
  document.querySelectorAll("[data-filter-group]").forEach((grp) => {
    const target = document.querySelectorAll(grp.dataset.filterGroup);
    grp.querySelectorAll("[data-f]").forEach((chip) => chip.addEventListener("click", () => {
      grp.querySelectorAll("[data-f]").forEach((c) => c.classList.toggle("on", c === chip));
      const f = chip.dataset.f;
      target.forEach((el) => el.classList.toggle("hidden", f !== "all" && !(el.dataset.cat || "").split(" ").includes(f)));
    }));
  });

  // ссылка вида magazin.html#elektrody сразу включает нужный фильтр
  const hf = location.hash.slice(1) && document.querySelector('[data-filter-group] [data-f="' + location.hash.slice(1) + '"]');
  if (hf) hf.click();

  /* ---------- подсветка якорей ---------- */
  const bar = document.querySelector(".anchor-bar");
  if (bar && "IntersectionObserver" in window) {
    const links = [...bar.querySelectorAll("a[href^='#']")];
    const io2 = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("on", l.getAttribute("href") === "#" + en.target.id));
    }), { rootMargin: "-40% 0px -55% 0px" });
    links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); s && io2.observe(s); });
  }
})();
