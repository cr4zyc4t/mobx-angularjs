import NgController from "core/NgController";
import Component from "core/Component";
import template from "./todo-app.template.html";

@Component({
	template,
})
class TodoApp extends NgController { }
export default TodoApp;