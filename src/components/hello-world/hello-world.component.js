import NgController from "core/NgController";
import Component from "core/Component";
import template from "./hello-world.template.html";

@Component({
	template,
	bindings: {
		name: "@"
	},
	inject: ["$scope", "$store"]
})
class HelloWorld extends NgController {
	constructor($scope, $store) {
		super();
		this.$scope = $scope;
		this.$store = $store;
		console.log(`ToanVQ: HelloWorldController -> constructor -> $scope, $store`, $scope, $store);
	}
	$onInit() {
		console.log(`ToanVQ: HelloWorldController -> constructor -> $scope, $store`, this.$scope, this.$store);
	}
}

export default HelloWorld