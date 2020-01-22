import template from "./hello-world.template.html";
import controller from "./hello-world.controller";

const HelloWorld = {
	bindings: {
		name: "@"
	},
	template,
	controller,
}

export default HelloWorld