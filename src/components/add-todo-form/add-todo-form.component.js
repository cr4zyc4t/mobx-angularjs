import NgController from "core/NgController";
import Component from "core/Component";
import template from "./add-todo-form.template.html";

@Component({
	template,
	inject: ["$store"],
})
class AddTodoForm extends NgController {
	constructor($store) {
		super();
		this.$store = $store;
		this.input = "";
	}
	handleSubmit() {
		const title = this.input.trim();
		if (title) {
			this.$store.addTodo(title);
			this.input = "";
		}
	}
}

export default AddTodoForm;