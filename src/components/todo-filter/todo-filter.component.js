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
	}
}

export default TodoFilter;