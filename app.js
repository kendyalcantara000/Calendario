const base = {
  Lunes:[
    {t:"9:00 - 12:00 🏋️ Gimnasio",lock:true},
    {t:"1:00 - 2:00 🗣️ Inglés",lock:true},
    {t:"2:00 - 4:30 🎓 UNICARIBE",lock:true},
    {t:"6:00 - 8:00 📘 Español I",lock:false},
    {t:"8:00 - 10:00 📐 Razonamiento Lógico",lock:false},
    {t:"11:00 😴 Dormir",lock:true}
  ],
  Martes:[
    {t:"9:00 - 12:00 🏋️ Gimnasio",lock:true},
    {t:"1:00 - 2:00 🗣️ Inglés",lock:true},
    {t:"2:00 - 4:30 🎓 UNICARIBE",lock:true},
    {t:"6:00 - 8:00 🧪 Lab CAM-112",lock:false},
    {t:"8:00 - 10:00 📊 Precálculo",lock:false},
    {t:"11:00 😴 Dormir",lock:true}
  ]
};

let data = JSON.parse(localStorage.getItem("data")) || structuredClone(base);
let done = JSON.parse(localStorage.getItem("done")) || {};

function save(){
  localStorage.setItem("data",JSON.stringify(data));
  localStorage.setItem("done",JSON.stringify(done));
}

function toggleDark(){
  document.body.classList.toggle("dark");
  localStorage.setItem("dark",document.body.classList.contains("dark"));
}

if(localStorage.getItem("dark")==="true"){
  document.body.classList.add("dark");
}

function render(filterDay=null){
  const cal=document.getElementById("calendar");
  cal.innerHTML="";
  Object.keys(data).forEach(day=>{
    if(filterDay && day!==filterDay) return;
    const box=document.createElement("div");
    box.className="day";
    box.innerHTML=`<h2>${day}</h2>`;
    data[day].forEach((o,i)=>{
      const id=day+"-"+i;
      const row=document.createElement("div");
      row.className="task"+(done[id]?" done":"")+(o.lock?" locked":"");
      row.innerHTML=`
        <input type="checkbox" ${done[id]?"checked":""} onchange="done['${id}']=!done['${id}'];save();render()">
        <span>${o.t}</span>
        ${o.lock?"":"<button onclick=\"editTask('"+day+"',"+i+")\">✏️</button>"}
        ${o.lock?"":"<button onclick=\"removeTask('"+day+"',"+i+")\">🗑️</button>"}
      `;
      box.appendChild(row);
    });
    box.innerHTML+=`<button onclick="addTask('${day}')">➕ Agregar</button>`;
    cal.appendChild(box);
  });
}

function addTask(day){
  const t=prompt("Nueva actividad:");
  if(!t) return;
  data[day].push({t,lock:false});
  save();render();
}

function editTask(day,i){
  const t=prompt("Editar:",data[day][i].t);
  if(!t) return;
  data[day][i].t=t;
  save();render();
}

function removeTask(day,i){
  if(!confirm("¿Eliminar?")) return;
  data[day].splice(i,1);
  save();render();
}

function showToday(){
  const d=new Date().toLocaleDateString("es-ES",{weekday:"long"});
  render(d.charAt(0).toUpperCase()+d.slice(1));
}

render();
