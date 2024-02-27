// Get DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage when the page is loaded
window.onload = loadTasks;

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = {
            text: taskText,
            id: Date.now(),
        };

        appendTaskToList(newTask);
        saveTasks();
        taskInput.value = '';
    }
}

function removeTask(button) {
    const task = button.parentNode;
    task.parentNode.removeChild(task);
    removeTaskFromLocalStorage(parseInt(task.getAttribute('data-id')));
}

function appendTaskToList({ text, id }) {
    const newTask = document.createElement('li');
    newTask.textContent = text;
    newTask.setAttribute('data-id', id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-medium text-md py-2 px-4 rounded';
    deleteButton.onclick = () => removeTask(deleteButton);

    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => ({
        text: task.textContent,
        id: parseInt(task.getAttribute('data-id')),
    }));

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(appendTaskToList);
}

function removeTaskFromLocalStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}