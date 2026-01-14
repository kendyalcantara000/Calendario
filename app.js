const base = {
  Lunes: [
    "9:00 - 12:00 🏋️ Gimnasio",
    "1:00 - 2:00 🗣️ Inglés",
    "2:00 - 4:30 🎓 UNICARIBE",
    "6:00 - 8:00 📘 Español I",
    "8:00 - 10:00 📐 Razonamiento Lógico",
    "11:00 😴 Dormir"
  ],
  Martes: [
    "9:00 - 12:00 🏋️ Gimnasio",
    "1:00 - 2:00 🗣️ Inglés",
    "2:00 - 4:30 🎓 UNICARIBE",
    "6:00 - 8:00 🧪 Lab CAM-112",
    "8:00 - 10:00 📊 Precálculo",
    "11:00 😴 Dormir"
  ],
  Miércoles: [
    "9:00 - 12:00 🏋️ Gimnasio",
    "1:00 - 2:00 🗣️ Inglés",
    "2:00 - 4:30 🎓 UNICARIBE",
    "5:00 - 6:00 🧭 Orientación Profesional",
    "6:00 - 8:00 📘 Español I",
    "8:00 - 10:00 📐 Razonamiento Lógico",
    "11:00 😴 Dormir"
  ],
  Jueves: [
    "9:00 - 12:00 🏋️ Gimnasio",
    "1:00 - 2:00 🗣️ Inglés",
    "2:00 - 4:30 🎓 UNICARIBE",
    "7:00 - 10:00 📊 Precálculo",
    "11:00 😴 Dormir"
  ],
  Viernes: [
    "9:00 - 12:00 🏋️ Gimnasio",
    "1:00 - 2:00 🗣️ Inglés",
    "2:00 - 4:30 🎓 UNICARIBE",
    "6:00 - 9:00 🌍 Cambio Climático",
    "11:00 😴 Dormir"
  ]
};

// ===== CARGA / GUARDADO =====
let data = JSON.parse(localStorage.getItem("calendarData"));
let done = JSON.parse(localStorage.getItem("calendarDone")) || {};

if (!data) {
  data = {};
  Object.keys(base).forEach(day => {
    data[day] = base[day].map(t => ({ text: t }));
  });
}

function save(){
  localStorage.setItem("calendarData", JSON.stringify(data));
  localStorage.setItem("calendarDone", JSON.stringify(done));
}

// ===== MODO OSCURO =====
function toggleDark(){
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}
if(localStorage.getItem("dark")==="true"){
  document.body.classList.add("dark");
}

// ===== RENDER =====
function render(filterDay=null){
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  Object.keys(data).forEach(day=>{
    if(filterDay && day!==filterDay) return;

    const box = document.createElement("div");
    box.className = "day";
    box.innerHTML = `<h2>${day}</h2>`;

    data[day].forEach((task,i)=>{
      const id = `${day}-${i}`;
      const row = document.createElement("div");
      row.className = "task" + (done[id] ? " done" : "");
      row.innerHTML = `
        <input type="checkbox" ${done[id]?"checked":""}
          onchange="done['${id}']=!done['${id}'];save();render()">
        <span>${task.text}</span>
        <button onclick="editTask('${day}',${i})">✏️</button>
        <button onclick="removeTask('${day}',${i})">🗑️</button>
      `;
      box.appendChild(row);
    });

    const btn = document.createElement("button");
    btn.textContent = "➕ Agregar actividad";
    btn.onclick = ()=>addTask(day);
    box.appendChild(btn);

    cal.appendChild(box);
  });
}

// ===== ACCIONES =====
function addTask(day){
  const t = prompt("Nueva actividad:");
  if(!t) return;
  data[day].push({text:t});
  save(); render();
}

function editTask(day,i){
  const t = prompt("Editar actividad:", data[day][i].text);
  if(!t) return;
  data[day][i].text = t;
  save(); render();
}

function removeTask(day,i){
  if(!confirm("¿Eliminar esta actividad?")) return;
  data[day].splice(i,1);
  save(); render();
}

function showToday(){
  const d = new Date().toLoc
