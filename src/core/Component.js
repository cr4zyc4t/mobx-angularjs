export default function Component({ inject, ...options }) {
	return (Controller) => {
		if (inject) {
			Controller.$inject = inject;
		}
		return {
			...options,
			controller: Controller,
		};
	};
}