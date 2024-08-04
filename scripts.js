document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskTitle = document.getElementById('task-title').value;
        const taskDescription = document.getElementById('task-description').value;
        const taskDueDate = document.getElementById('task-due-date').value;

        addTask(taskTitle, taskDescription, taskDueDate);

        taskForm.reset();
    });

    function addTask(title, description, dueDate) {
        const taskItem = document.createElement('li');

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = title;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = description;

        const taskDueDate = document.createElement('small');
        taskDueDate.textContent = `Due: ${dueDate}`;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => completeTask(taskItem));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(taskItem, title));

        taskItem.appendChild(taskTitle);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDueDate);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

        saveTaskToLocalStorage({ title, description, dueDate, completed: false });
    }

    function completeTask(taskItem) {
        taskItem.classList.toggle('completed');
        updateTaskInLocalStorage(taskItem);
    }

    function deleteTask(taskItem, title) {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(title);
    }

    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');

            const taskTitle = document.createElement('h3');
            taskTitle.textContent = task.title;

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;

            const taskDueDate = document.createElement('small');
            taskDueDate.textContent = `Due: ${task.dueDate}`;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => completeTask(taskItem));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(taskItem, task.title));

            taskItem.appendChild(taskTitle);
            taskItem.appendChild(taskDescription);
            taskItem.appendChild(taskDueDate);
            taskItem.appendChild(completeButton);
            taskItem.appendChild(deleteButton);

            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskList.appendChild(taskItem);
        });
    }
    gtag('event', 'button_click', {
        'event_category': 'button',
        'event_label': 'sign_up',
      });

    function updateTaskInLocalStorage(taskItem) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskTitle = taskItem.querySelector('h3').textContent;
        const taskIndex = tasks.findIndex(task => task.title === taskTitle);

        if (taskIndex !== -1) {
            tasks[taskIndex].completed = taskItem.classList.contains('completed');
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function removeTaskFromLocalStorage(title) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.title !== title);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? '' : 'none';
                break;
            case 'pending':
                task.style.display = !task.classList.contains('completed') ? '' : 'none';
                break;
        }
    });
}