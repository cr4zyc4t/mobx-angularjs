import { observable, action, IObservableArray, computed } from "mobx";
import Todo from "./Todo";

export const Filter = {
	All: "All",
	Active: "Active",
	Completed: "Completed",
}

export default class TodoApp {
	@observable filter;
	todos;

	constructor(filter, todos) {
		this.filter = filter;
		this.todos = observable(todos);
	}

	@action
	addTodo(title) {
		const newTodo = new Todo(title);
		newTodo.once(Todo.EVENT_DESTROY, () => {
			this.deleteTodo(newTodo)
		})
		this.todos.push(newTodo)
	}

	// @action
	// deleteTodo(id: string) {
	// 	// this.todos.replace(this.todos.filter(todo => todo.id !== id))
	// 	this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
	// }

	@action
	deleteTodo(todo) {
		this.todos.remove(todo);
	}

	@action
	changeFilter(filter) {
		this.filter = filter;
	}

	@action
	toggleAll(isChecked) {
		this.todos.forEach(todo => todo.isCompleted = isChecked)
	}

	@computed
	get completedTodos() {
		return this.todos.filter(todo => todo.isCompleted)
	}

	@computed
	get activeTodos() {
		return this.todos.filter(todo => !todo.isCompleted)
	}

	@computed
	get showTodos() {
		switch (this.filter) {
			case Filter.Active:
				return this.activeTodos;
			case Filter.Completed:
				return this.completedTodos;
			default:
				return this.todos;
		}
	}
}