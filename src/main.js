/* eslint-disable angular/function-type */
/* eslint-disable angular/document-service */
import angular from "angular";
import mobxAngular from "mobx-angularjs";
import TodoAppStore, { Filter } from "./models/TodoApp";
import "./style.scss";
import AddTodoForm from "components/add-todo-form/add-todo-form.component";
import TodoList from "components/todo-list/todo-list.component";
import TodoFilter from "components/todo-filter/todo-filter.component";
import TodoApp from "components/todo-app/todo-app.component";

angular.module("TodoApp", [mobxAngular])
	.component("addTodoForm", AddTodoForm)
	.component("todoList", TodoList)
	.component("todoFilter", TodoFilter);

angular.module("myApp", ["TodoApp"])
	.component("todoApp", TodoApp)
	.factory("$store", () => {
		const store = new TodoAppStore(Filter.All, []);
		return store;
	});

angular.bootstrap(document.getElementById("root"), ["myApp"]);