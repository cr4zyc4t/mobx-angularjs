import BaseController from "../../BaseController";

/* @ngInject */
export default class HelloWorldController extends BaseController {
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