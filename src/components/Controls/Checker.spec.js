import Checker from './Checker.svelte';

describe('Checker', () => {
	let target;
	let checker;
	beforeEach(() => {
		//  create a new element
		target = document.createElement('div');
		//  render the component in the new element
		checker = new Checker({ target });
	});

	it('is a Check button', (next) => {
		// TODO: Svelte Component Scaffolding for tests like this is bulky
		// check out @testing-library/svelte
		// wait for component to mount
		setTimeout(() => {
			const { firstElementChild: element } = target;
			// test rendered element
			expect(element.textContent).toBe('Check');
			// call next to complete test
			next();
		}, 0);
	});
});