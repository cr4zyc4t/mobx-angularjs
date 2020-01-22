import NgController from "core/NgController";
import Component from "core/Component";
import template from "./todo-filter.template.html";

@Component({
	template,
	inject: ["$store"],
})
class TodoFilter extends NgController {
	constructor($store) {
		super();
		this.$store = $store;

		// this.activeTodoWord = $store.todos.activeTodos.length > 1 ? "items" : "item";
	}


}

export default TodoFilter;