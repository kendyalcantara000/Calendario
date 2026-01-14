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
  Object.
