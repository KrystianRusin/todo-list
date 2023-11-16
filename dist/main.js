(()=>{"use strict";const e=()=>({createTodo:(e,t,o,a,n,d)=>({title:e,desc:t,due:o,prio:a,isDone:n,id:Math.floor(1e4*Math.random())}),getTitle:e=>e.title,getDesc:e=>e.desc,getDue:e=>e.due,getPrio:e=>e.prio,setPrio:(e,t)=>{e.prio=t},getIsDone:e=>e.isDone,setIsDone:e=>{e.isDone?e.isDone=!1:e.isDone=!0},getId:e=>e.id}),t=()=>({createProject:(e,t,o)=>(null==o&&(o=Math.floor(1e4*Math.random())),{name:e,todoList:t,id:o}),getName:e=>e.name,getId:e=>e.projectId,getTodoList:e=>e.todoList,addTodo:(e,t)=>{e.todoList.push(t)},removeTodo:(e,t)=>e.todoList.filter((e=>e.id!=t)),setTodoList:(e,t)=>{e.todoList=t}}),o=e=>{const o=t(),a=document.getElementById("project-list"),d=document.createElement("li");if(d.innerHTML=o.getName(e),d.dataset.projectId=e.id,0!=e.id){const t=document.createElement("button");t.classList.add("remove-btn"),t.innerHTML="X",t.dataset.projectId=e.id,d.appendChild(t)}a.append(d),n(e.todoList)},a=()=>{document.getElementById("project-list").innerHTML="";for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);o(JSON.parse(localStorage.getItem(t)))}},n=t=>{e(),document.querySelector(".main-content").innerHTML="",t.forEach((e=>{d(e)}))},d=t=>{const o=e(),a=document.querySelector(".main-content"),n=document.createElement("div");n.classList.add("todo-container");const d=document.createElement("h3");d.innerHTML=o.getTitle(t),d.classList.add("todo-title"),n.appendChild(d);const r=document.createElement("p");r.innerHTML=o.getDesc(t),r.classList.add("todo-desc"),n.appendChild(r);const l=document.createElement("p");l.innerHTML=o.getDue(t),l.classList.add("todo-due"),n.appendChild(l);const c=document.createElement("p");c.innerHTML=o.getPrio(t),c.classList.add("todo-prio"),n.appendChild(c);const i=document.createElement("p");i.innerHTML=o.getIsDone(t),i.classList.add("todo-done"),n.appendChild(i);const s=document.createElement("button");s.dataset.id=o.getId(t),s.innerHTML="X",n.appendChild(s),a.appendChild(n)};let r=0;document.addEventListener("DOMContentLoaded",(function(){(()=>{const o=document.querySelector(".add-task-btn"),d=document.querySelector(".input-modal");let l=JSON.parse(localStorage.getItem(0));l||(l=t().createProject("All",[],0),localStorage.setItem(0,JSON.stringify(l))),a(),o.addEventListener("click",(function(){d.showModal()})),console.log(JSON.parse(localStorage.getItem(0))),JSON.parse(localStorage.getItem(0)),n(t().getTodoList(l)),document.querySelector(".main-content").addEventListener("click",(function(e){if("BUTTON"===e.target.tagName&&"DIV"===e.target.parentElement.tagName){(e=>{let o=r,a=JSON.parse(localStorage.getItem(o));if(t().setTodoList(a,t().removeTodo(a,e)),localStorage.setItem(o,JSON.stringify(a)),0!=o){let o=JSON.parse(localStorage.getItem("0"));t().setTodoList(o,t().removeTodo(o,e)),localStorage.setItem("0",JSON.stringify(o))}n(a.todoList)})(e.target.getAttribute("data-id"))}})),document.getElementById("add-task-submit").addEventListener("click",(function(o){o.preventDefault();let a=document.getElementById("title").value,d=document.getElementById("desc").value,l=document.getElementById("date").value,c=document.getElementById("priority").value;(e=>{let o=r,a=JSON.parse(localStorage.getItem(o));if(t().addTodo(a,e),localStorage.setItem(o,JSON.stringify(a)),0!=o){let o=JSON.parse(localStorage.getItem("0"));t().addTodo(o,e),localStorage.setItem("0",JSON.stringify(o))}n(a.todoList)})(e().createTodo(a,d,l,c,!1,Math.floor(1e4*Math.random())))}));const c=document.getElementById("add-project-btn"),i=t();c.addEventListener("click",(function(e){e.preventDefault();let t=document.getElementById("project-name").value,o=i.createProject(t,[]);localStorage.setItem(o.id,JSON.stringify(o)),a()})),document.getElementById("project-list").addEventListener("click",(function(e){if("BUTTON"===e.target.tagName&&"LI"===e.target.parentElement.tagName&&(o=e.target.getAttribute("data-project-id"),localStorage.removeItem(o),a()),"LI"===e.target.tagName&&"UL"===e.target.parentElement.tagName){(e=>{r=e})(e.target.getAttribute("data-project-id"));let o=JSON.parse(localStorage.getItem(r));console.log(o),n(t().getTodoList(o))}var o}))})()}))})();