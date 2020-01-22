import NgController from "core/NgController";
import template from "./todo-list.template.html";
import Component from "core/Component";
import { autorun } from "mobx";

@Component({
	template,
	inject: ["$store"],
})
class TodoList extends NgController {
	constructor($store) {
		super();

		this.$store = $store;
		this.editingId = null;
		this.editingTitle = "";
	}

	$onInit() {
		this.dispose = autorun(() => {
			this.isCheckAll = this.$store.activeTodos.length === 0 && this.$store.todos.length > 0;
		});
	}

	$onDestroy() {
		this.dispose();
	}

	setEditing(todo) {
		if (!todo) {
			this.editingId = null;
			this.editingTitle = "";
			return;
		}
		this.editingId = todo.id;
		this.editingTitle = todo.title;
	}

	handleEdit($event, todo) {
		if ($event.keyCode !== 13) {
			return;
		}
		todo.setTitle(this.editingTitle);
		this.setEditing(null);
	}

	handleCheckAll() {
		this.$store.toggleAll(this.isCheckAll);
		console.log("TCL: TodoList -> handleCheckAll -> this.isCheckAll", this.isCheckAll);
	}
}

export default TodoList;