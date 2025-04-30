document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = loadTasks();
    renderTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const listItem = target.closest('li');
        if (!listItem) return;

        const taskId = parseInt(listItem.dataset.taskId);

        if (target.classList.contains('complete-btn')) {
            toggleComplete(taskId);
        } else if (target.classList.contains('delete-btn')) {
            deleteTask(taskId);
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.dataset.taskId = task.id;
            listItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="actions">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    }

    function toggleComplete(taskId) {
        tasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }
});