// ---------- Логіка ----------

const PATTERNS = {
  email: /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/,
  phone: /^\+380\d{9}$/,
  date: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
};

// Картка: 4 групи по 4 цифри, не частина довшої послідовності цифр
const CARD_REGEX = /(?<!\d)(\d{4}) (\d{4}) (\d{4}) (\d{4})(?!\d)/g;

function validate(type, value) {
  return PATTERNS[type].test(value.trim());
}

function maskCards(text) {
  return [...text.matchAll(CARD_REGEX)].map((m) => `**** **** **** ${m[4]}`);
}

// ---------- Інтерфейс ----------

function setMessage(el, text, ok) {
  el.textContent = text;
  el.className = "message " + (ok ? "ok" : "error");
}

document.getElementById("validate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("type").value;
  const value = document.getElementById("value").value;
  const result = document.getElementById("validate-result");

  if (validate(type, value)) {
    setMessage(result, "Перевірка пройдена", true);
  } else {
    setMessage(result, "Помилка: значення не відповідає формату", false);
  }
});

document.getElementById("cards-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("cards").value;
  const result = document.getElementById("cards-result");
  const list = document.getElementById("cards-list");
  const masked = maskCards(text);

  list.innerHTML = "";
  if (masked.length === 0) {
    setMessage(result, "Помилка: картки у форматі XXXX XXXX XXXX XXXX не знайдено", false);
    return;
  }

  setMessage(result, `Знайдено карток: ${masked.length}`, true);
  masked.forEach((card) => {
    const li = document.createElement("li");
    li.textContent = card;
    list.appendChild(li);
  });
});
