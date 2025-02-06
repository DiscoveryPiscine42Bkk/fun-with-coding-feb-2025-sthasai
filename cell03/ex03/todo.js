       
        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        
        function setCookie(name, value, days) {
            let d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); 
            let expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

       
        function createToDoElement(todoText) {
            const div = document.createElement('div');
            div.classList.add('todo');
            div.textContent = todoText;

           
            div.addEventListener('click', function() {
                if (confirm("Do you want to remove this TO DO?")) {
                    div.remove(); 
                    updateCookie();
                }
            });

            return div;
        }


        function loadToDoList() {
            const todos = getCookie('todos');
            if (todos) {
                const todoList = JSON.parse(todos);
                todoList.forEach(todo => {
                    const newToDo = createToDoElement(todo);
                    document.getElementById('ft_list').appendChild(newToDo);
                });
            }
        }


        function updateCookie() {
            const todos = [];
            document.querySelectorAll('.todo').forEach(todo => {
                todos.push(todo.textContent);
            });
            setCookie('todos', JSON.stringify(todos), 7); 
        }
       
        document.getElementById('newButton').addEventListener('click', function() {
            const newToDo = prompt("Enter a new TO DO:");
            if (newToDo && newToDo.trim() !== "") {
                const newToDoElement = createToDoElement(newToDo.trim());
                const ftList = document.getElementById('ft_list');
                ftList.insertBefore(newToDoElement, ftList.firstChild); 
                updateCookie(); 
            }
        });

    
        loadToDoList();