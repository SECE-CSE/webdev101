function loadTasks() {
    // Get tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Append each task to the task list
    tasks.forEach(task => {
        appendTaskToList(task);
    });
}

function appendTaskToList(task) {
    // search for total-task element
    var totalTask = document.getElementById('total-task')

    // create a new list element 
    var taskItem = document.createElement('li')

    // set task to newly created list element
    taskItem.textContent = task

    // set class name for the list element
    taskItem.className = 'rounded-lg border border-gray-200 bg-white p-6 shadow-md gap-3 mt-3 items-center flex justify-between'

    // Create delete button and set class name
    var deleteButton = document.createElement('button')

    // Set button name to Delete
    deleteButton.textContent = 'Delete'

    // Set class name for the button
    deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded-full'

    // Add event listener to the delete button
    deleteButton.addEventListener('click', function() {
        taskItem.remove()

        // get child node count for the task list
        var taskCount = document.getElementById('task-list').childElementCount
        totalTask.textContent = taskCount

        // Update tasks in local storage
        updateTasksInLocalStorage();
    })

    // Append delete button to the task item
    taskItem.appendChild(deleteButton)

    // now add the task item to the task list dom
    document.getElementById('task-list').appendChild(taskItem)
}

function addTask() {
    // search for input element with id 'task-input'
    var task = document.getElementById('task-input').value

    // check if task is empty
    if (task.trim() !== '') {
        // Append task to list
        appendTaskToList(task);

        // Update tasks in local storage
        updateTasksInLocalStorage();

        // clear the input field
        document.getElementById('task-input').value = ''
    }    
}

function updateTasksInLocalStorage() {
    var task_list = document.getElementById('task-list')
    let tasks_nodes = Array.from(task_list.children)
    localStorage.setItem('tasks', JSON.stringify(tasks_nodes.filter(task => task.nodeName === 'li').map(task => task.textContent)))
}

function deleteAll() {
    document.getElementById('task-list').innerHTML = ''

    // set total task count to zero for delete all
    var totalTask = document.getElementById('total-task')
    totalTask.textContent = 0

    // Clear tasks from local storage
    localStorage.removeItem('tasks');
}