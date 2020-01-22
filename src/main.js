import angular from "angular"
import HelloWorld from "./components/hello-world"
import TodoApp, { Filter } from "./models/TodoApp"

angular.module("myApp", [])
	.component("helloWorld", HelloWorld)
	.factory("$store", () => {
		const store = new TodoApp(Filter.All, [])
		return store
	})

angular.bootstrap(document.getElementById("root"), ["myApp"])