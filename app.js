document.addEventListener('DOMContentLoaded', () => {
    // Elementi del DOM
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('tasks');
    
    // Carica i compiti dal localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Renderizza i compiti iniziali
    renderTasks();
    
    // Event listener per aggiungere un nuovo compito
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Funzione per aggiungere un nuovo compito
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText !== '') {
            // Crea un nuovo oggetto compito
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            
            // Aggiungi il compito all'array
            tasks.push(task);
            
            // Salva nel localStorage
            saveTasksToLocalStorage();
            
            // Renderizza i compiti aggiornati
            renderTasks();
            
            // Pulisci l'input
            taskInput.value = '';
            taskInput.focus();
        }
    }
    
    // Funzione per cancellare un compito
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasksToLocalStorage();
        renderTasks();
    }
    
    // Funzione per cambiare lo stato di un compito (completato/non completato)
    function toggleTaskStatus(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasksToLocalStorage();
        renderTasks();
    }
    
    // Funzione per salvare i compiti nel localStorage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Funzione per renderizzare i compiti nella lista
    function renderTasks() {
        // Pulisci la lista
        taskList.innerHTML = '';
        
        // Aggiungi ogni compito alla lista
        tasks.forEach(task => {
            const li = document.createElement('li');
            
            // Crea il testo del compito
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add('completed');
            }
            
            // Aggiungi event listener per cambiare lo stato del compito
            taskText.addEventListener('click', () => toggleTaskStatus(task.id));
            
            // Crea il pulsante per eliminare
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Elimina';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            
            // Aggiungi gli elementi al list item
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            
            // Aggiungi il list item alla lista
            taskList.appendChild(li);
        });
    }
});