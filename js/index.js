const todoContainerEl = document.querySelector('#todoContainer');
const todoInputEl = document.querySelector('#todoInput');
const todoButtonEl = document.querySelector('#todoButton');
const logoutButtonEl = document.querySelector('#logoutButton');

const isLogin = () => {
    const loginedUser = localStorage.getItem('login'); //login 키에서 받아오기
    if (!loginedUser) {
        alert('로그인이 필요합니다!');
        location.href = './signin.html';
    }
};

const readTodo = () => {
    todoContainerEl.innerHTML = ' ';

    const todos = JSON.parse(localStorage.getItem('todos')).reverse(); // 가져온 todo 목록 순서를 뒤집음

    todos.forEach(todo => {
        const divEl = document.createElement('div');
        const completeEl = document.createElement('input');
        const userEl = document.createElement('p');
        const deleteEl = document.createElement('button');
        const contentEl = document.createElement('label'); 

        divEl.className = 'todoItem';

        completeEl.type = 'checkbox';
        completeEl.className = 'checkbox';
        completeEl.id = todo.id;
        completeEl.addEventListener('click', () => {
            updateComplete(todo.id, completeEl.checked);
        });
        completeEl.checked = todo.completeEl; //boolean값. 체크 여부
        

        deleteEl.type = 'button';
        deleteEl.textContent = 'X';
        deleteEl.className = 'deleteButton';
        deleteEl.addEventListener('click', () => deleteTodo(todo.id)); //click하면 todo.id를 갖는 투두 삭제 함수 실행

        contentEl.textContent = todo.content;
        contentEl.htmlFor = todo.id; //라벨 for 속성에다가 체크박스에 있는 id와 맞추면 체크박스가 체크됨. 무조건 체크하게 하기 위해 만들었다고? 예? 

        userEl.textContent = todo.user;

        divEl.append(completeEl, contentEl, userEl, deleteEl);
        todoContainerEl.append(divEl);
    });
};

// 읽기 전
const createTodo = () => {
    const todoText = todoInputEl.value;

    const todos = JSON.parse(localStorage.getItem('todos')); //배열안에 todos 저장
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const newTodo = {
        id: newId,
        complete: false,
        content: todoText,
        user: localStorage.getItem('login')
    };

    todos.push(newTodo);
    
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInputEl.value = ''; //초기화

    readTodo();
};

const deleteTodo = (deleteId) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const filteredTodos = todos.filter(todo => todo.id !== deleteId); //deleteId와 같지 않은 것은 filtering

    localStorage.setItem('todos', JSON.stringify(filteredTodos));
    readTodo();
}

const init = () => {
    isLogin();
    if(!localStorage.getItem('todos')) {
        localStorage.setItem('todos', JSON.stringify([])); 
    }

    readTodo();

    todoButtonEl.addEventListener('click', createTodo);
    //logoutButtonEl.addEventListener('click', logout);
};


document.addEventListener('DOMContentLoaded', init);


