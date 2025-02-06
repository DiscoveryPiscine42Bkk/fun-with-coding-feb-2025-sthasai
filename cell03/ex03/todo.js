function saveToDoList() {
    const todos = [];
    const todoElements = document.querySelectorAll('.todo');
    todoElements.forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
}
function loadToDoList() {
    const cookie = document.cookie;
    const todos = cookie.split('todos=')[1];
    if (todos) {
        const todoList = JSON.parse(todos);
        todoList.forEach(todo => {
            const div = document.createElement('div');
            div.classList.add('todo');
            div.textContent = todo;
            document.getElementById('ft_list').appendChild(div);

            div.addEventListener('click', function() {
                if (confirm("Do you want to remove this TO DO?")) {
                    div.remove();
                    saveToDoList();
                }
            });
        });
    }
}
document.getElementById('newButton').addEventListener('click', function() {
    const newToDo = prompt("Enter a new TO DO:");
    if (newToDo && newToDo.trim() !== "") {
        const div = document.createElement('div');
        div.classList.add('todo');
        div.textContent = newToDo.trim();
        document.getElementById('ft_list').prepend(div);

        div.addEventListener('click', function() {
            if (confirm("Do you want to remove this TO DO?")) {
                div.remove();
                saveToDoList(); 
            }
        });

        saveToDoList();
    }
});
loadToDoList();