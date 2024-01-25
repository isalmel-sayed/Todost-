/*
// To Do List:

// Drag And Drop :
const allBoxes = document.querySelectorAll('.box');
const allTasks = document.querySelectorAll('.task');

allTasks.forEach(task => {
    task.addEventListener('dragstart', ()=>{
        task.classList.add('is-dragging')
    })
    task.addEventListener('dragend', ()=>{
        task.classList.remove('is-dragging')
    })
});

allBoxes.forEach(box => {
    box.addEventListener('dragover' , (e) => {
        e.preventDefault();

        const curTask = document.querySelector('.is-dragging')

        box.appendChild(curTask)
    })
    
});

//Adding New Task :
const form = document.querySelector('#add-form');
const input = document.querySelector('#todoinput');
const todoBox = document.querySelector('#to-do');

form.addEventListener('submit' , e => {
    e.preventDefault();

    const newTaskText = input.value ;

    if(!newTaskText) return ;
    


    //<p class="task" draggable="true">playing football</p>
    const newTask =document.createElement('p')
    newTask.classList.add('task')
    newTask.setAttribute('draggable' , 'true')
    newTask.innerHTML = newTaskText

    newTask.addEventListener('dragstart' , () => {
        newTask.classList.add('is-dragging')
    })

    newTask.addEventListener('dragend' , () => {
        newTask.classList.remove('is-dragging')
    })

    todoBox.appendChild(newTask);

    input.value='';
    
});
*/


document.addEventListener('DOMContentLoaded', () => {
    const allBoxes = document.querySelectorAll('.box');
    const form = document.querySelector('#add-form');
    const input = document.querySelector('#todoinput');
    const todoBox = document.querySelector('#to-do');

    // Load tasks from local storage on page load
    loadTasks();

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(task => {
            createTaskElement(task.text, todoBox, task.id);
        });
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(text, container, id) {
        const newTask = document.createElement('p');
        newTask.classList.add('task');
        newTask.setAttribute('draggable', 'true');
        newTask.innerHTML = text;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            removeTask(id);
            newTask.remove();
        });

        newTask.appendChild(deleteButton);

        newTask.addEventListener('dragstart', () => {
            newTask.classList.add('is-dragging');
        });

        newTask.addEventListener('dragend', () => {
            newTask.classList.remove('is-dragging');
            saveTasks(getTasks());
        });

        container.appendChild(newTask);
    }

    function removeTask(id) {
        const tasks = getTasks().filter(task => task.id !== id);
        saveTasks(tasks);
    }

    function getTasks() {
        const tasks = [];
        const taskElements = document.querySelectorAll('.task');

        taskElements.forEach(taskElement => {
            tasks.push({ text: taskElement.innerHTML, id: taskElement.dataset.taskId });
        });

        return tasks;
    }

    allBoxes.forEach(box => {
        box.addEventListener('dragover', (e) => {
            e.preventDefault();

            const curTask = document.querySelector('.is-dragging');

            if (curTask) {
                box.appendChild(curTask);
                saveTasks(getTasks());
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTaskText = input.value;

        if (!newTaskText) return;

        const taskId = Date.now(); // Unique ID for each task

        createTaskElement(newTaskText, todoBox, taskId);
        input.value = '';

        // Save tasks to local storage
        saveTasks(getTasks());
    });
});





