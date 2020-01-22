import { observable, action } from "mobx";
import uuid from "uuid/v4";
import { EventEmitter } from "events";

export default class Todo extends EventEmitter {
	static EVENT_DESTROY = "DESTROY"

	@observable id;
	@observable title;
	@observable isCompleted;

	constructor(title) {
		super();

		this.id = uuid();
		this.title = title;
		this.isCompleted = false;
	}

	@action
	setTitle(title) {
		this.title = title;
	}

	@action
	toggle(isCompleted) {
		if (isCompleted !== undefined) {
			this.isCompleted = isCompleted;
		} else {
			this.isCompleted = !this.isCompleted;
		}
	}

	@action
	destroy() {
		this.emit(Todo.EVENT_DESTROY);
	}
}