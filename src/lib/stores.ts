import { writable } from 'svelte/store';

export const tags = writable([
	'enthusiasm',
	'topic',
	'ph-range',
	'ph-limit',
	'ph-target',
	'manganese-level',
	'timeline',
	'weather',
	'delivery-method'
]);

export const parsedData = writable([]);
