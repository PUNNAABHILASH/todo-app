const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

document.querySelector('.js-add-todo-btn').addEventListener('click', () => {
	addTodo();
});

function addTodo() {
	const inputElement = document.querySelector('.js-todo-name');
	let name = inputElement.value;

	const dateInputElement = document.querySelector('.js-due-date-input');
	let dueDate = dateInputElement.value;

	todoList.push({ name, dueDate }); // shorthand prop when property name and value are same

	inputElement.value = '';
	dateInputElement.value = '';
	saveStorage();
	renderTodoList();
}

function renderTodoList() {
	let todoListHTML = '';
	todoList.forEach((todoObject, index) => {
		const { name, dueDate } = todoObject;
		let html = `
		<div>${name}</div>
		<div>${dueDate}</div>
		<button class="delete-todo-button js-delete-todo-button">Delete</button>`;
		todoListHTML += html;
	});

	document.querySelector('.js-todo-list').innerHTML = todoListHTML;

	//querySelectorAll gives array of values
	document.querySelectorAll('.js-delete-todo-button').forEach((deleteBtn, index) => {
		deleteBtn.addEventListener('click', () => {
			todoList.splice(index, 1);
			saveStorage();
			renderTodoList();
		});
	});
}

function saveStorage() {
	localStorage.setItem('todoList', JSON.stringify(todoList));
}
