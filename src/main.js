/* eslint-disable angular/function-type */
/* eslint-disable angular/document-service */
import angular from "angular";
import mobxAngular from "mobx-angularjs";
import TodoApp, { Filter } from "./models/TodoApp";
import "./style.scss";
import AddTodoForm from "components/add-todo-form/add-todo-form.component";
import TodoList from "components/todo-list/todo-list.component";
import TodoFilter from "components/todo-filter/todo-filter.component";

angular.module("myApp", [mobxAngular])
	.component("addTodoForm", AddTodoForm)
	.component("todoList", TodoList)
	.component("todoFilter", TodoFilter)
	.factory("$store", () => {
		const store = new TodoApp(Filter.All, []);
		return store;
	});

angular.bootstrap(document.getElementById("root"), ["myApp"]);