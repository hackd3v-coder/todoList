let tasks = [
    {
        id: 1,
        title: "Préparer la présentation pour le client",
        category: "💼 travail",
        priority: "🔴 urgent",
        completed: false
    },
    {
        id: 2,
        title: "Faire les courses pour la semaine",
        category: "🧑 personnel",
        priority: "🟢 normal",
        completed: false
    },
    {
        id: 3,
        title: "Répondre aux emails importants",
        category: "💼 travail",
        priority: "🔴 urgent",
        completed: true
    },
    {
        id: 4,
        title: "Appeler le plombier pour la fuite d'eau",
        category: "🧑 personnel",
        priority: "🔴 urgent",
        completed: false
    },
    {
        id: 5,
        title: "Finaliser le rapport trimestriel",
        category: "💼 travail",
        priority: "🟢 normal",
        completed: false
    },
    {
        id: 6,
        title: "Organiser la réunion d'équipe",
        category: "📌 autre",
        priority: "🟢 normal",
        completed: true
    },
    {
        id: 7,
        title: "Payer les factures d'électricité",
        category: "🧑 personnel",
        priority: "🔴 urgent",
        completed: false
    },
    {
        id: 8,
        title: "Mettre à jour le CV",
        category: "📌 autre",
        priority: "🟢 normal",
        completed: false
    },
    {
        id: 9,
        title: "Préparer la liste des invités pour l'anniversaire",
        category: "🧑 personnel",
        priority: "🟢 normal",
        completed: false
    },
    {
        id: 10,
        title: "Faire la revue de code du projet",
        category: "💼 travail",
        priority: "🔴 urgent",
        completed: false
    },
    {
        id: 11,
        title: "Nettoyer et ranger le bureau",
        category: "📌 autre",
        priority: "🟢 normal",
        completed: false
    },
    {
        id: 12,
        title: "Envoyer le devis au nouveau client",
        category: "💼 travail",
        priority: "🔴 urgent",
        completed: false
    }
    ];

let searchInput = document.getElementById('searchInput');
let filterBtns = document.querySelectorAll('.filter-btn');
let todoList = document.querySelector('.todo-list');
let taskInput = document.getElementById('taskInput');
let priority = document.getElementById('prioritySelect');
let category = document.getElementById('categorySelect');
let addBtn = document.getElementById('addBtn');
let stat = document.getElementById('statsCount');
let clearBtn = document.getElementById('clearBtn');

let nextId = tasks.length + 1;
let currentFilter = 'all';
let searchTerm = '';
    

function renderTasks(){
     let filteredTasks = tasks;

     if (currentFilter === 'active'){
       filteredTasks = tasks.filter(task => task.completed === false)
     }else if (currentFilter === 'completed'){
        filteredTasks = tasks.filter(task => task.completed === true)
     }

     if (searchTerm.trim() !== ''){
        const term = searchTerm.toLowerCase().trim();
        filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(term))
     };
     todoList.innerHTML = '';
     
     filteredTasks.forEach(task =>{
        const taskElement = document.createElement('div');
        taskElement.className = `todo-item${task.completed ? ' todo-completed' : ''}`;
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `
        <div class="todo-check">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
        </div>
        <div class="todo-text">
          <span>${task.title}</span>
          <span class="badge ${task.priority}">${task.priority}</span>
          <span class="badge ${task.category}">${task.category}</span>
        </div>
        <div class="todo-actions">
          <button class="delete-btn" data-id="${task.id}">
            <i class="far fa-trash-alt"></i>
          </button>
          <button class="edit-btn" data-id="${task.id}">
            <i class="far fa-edit"></i>
          </button>
        </div>
      `;
     const checkbox = taskElement.querySelector('input[type= "checkbox"]');
     checkbox.addEventListener('change',()=>{
        toggleTask(task.id)
     })
     const deleteBtn = taskElement.querySelector('.delete-btn');
     deleteBtn.addEventListener('click',(event)=>{
        event.stopPropagation()
        deleteTask(task.id)
     })
     const editBtn = taskElement.querySelector('.edit-btn');
     editBtn.addEventListener('click',(event)=>{
        event.stopPropagation()
        editTask(task.id)
     })
     todoList.appendChild(taskElement)
    })
    if (filteredTasks.length === 0) {
        todoList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-inbox"></i>
          <p>Aucune tâche à afficher</p>
        </div>
      `;
    }

    let total = filteredTasks.length
    let completed = filteredTasks.filter(task=> (task.completed)).length
    let active = total - completed
    stat.textContent = `${active} actives · ${completed} terminées`
    
}



function toggleTask(id){
    const task = tasks.find(t=> t.id === id);
    task.completed = !task.completed;
    renderTasks()
}
function deleteTask(id){
    tasks = tasks.filter(t => t.id !== id)
    renderTasks()
}
function editTask(id){
    let text = prompt("Entrer le nouveau titre de la tache : ")
    if(text.trim()!==''){
        const task = tasks.find(t=>t.id === id)
        task.title = text 
        renderTasks()
    }
}
function addTask(){
    const text = taskInput.value.trim()
    if (text === ''){
        taskInput.focus()
        taskInput.style.border = '2px solid #b3413a';
      setTimeout(() => {
        taskInput.style.border = 'none';
      }, 1000);
      return;
    }
    const task = {
        id : nextId,
        title : text,
        category: categorySelect.value,
        priority: prioritySelect.value,
        completed: false
    }
    tasks.push(task)
    taskInput.value = '';
    taskInput.focus()
    renderTasks()
}
addBtn.addEventListener('click',()=>{addTask()})
filterBtns.forEach(btn => btn.addEventListener('click',()=>{
    currentFilter = btn.dataset.filter
    filterBtns.forEach(btn => btn.className = "filter-btn" )
    btn.className = "filter-btn active";
    renderTasks()
}))
searchInput.addEventListener('input',()=>{
    searchTerm = searchInput.value
    renderTasks()
})
clearBtn.addEventListener('click',()=>{
    tasks = tasks.filter(task => !task.completed)
    renderTasks()
})


renderTasks()
