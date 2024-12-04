document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('tasks');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#tasks li').forEach((taskItem) => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed'),
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add a task to the DOM
    const addTaskToDOM = (text, completed = false) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = text;

        if (completed) {
            taskItem.classList.add('completed');
        }

        // Complete Button
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete-btn';
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        // Append buttons to task item
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        // Append task to list
        taskList.appendChild(taskItem);
    };

    // Add a task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = '';
    });

    // Initial load of tasks
    loadTasks();
});
