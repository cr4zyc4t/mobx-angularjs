import NgController from "core/NgController";
import template from "./todo-list.template.html";
import Component from "core/Component";

@Component({
	template,
	inject: ["$store"],
})
class TodoList extends NgController {
	constructor($store) {
		super();

		this.$store = $store;
		this.editingId = null;
	}
}

export default TodoList;