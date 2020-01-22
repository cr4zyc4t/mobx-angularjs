import NgController from "core/NgController";

/* @ngInject */
export default class HelloWorldController extends NgController {
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