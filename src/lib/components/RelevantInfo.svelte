<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { parsedData } from '../stores';
	/**
	 * @type {any[]}
	 */
	let reLinks = [];
	let qs = [];

	onMount(() => {
		qs = JSON.parse(sessionStorage.getItem('parsedData'))['queries'] || [];
		if (qs.length == 0) {
			reLinks = [];
		} else {
			for (let i = 0; i < qs.length; i++) {
				const res = fetch('/api/relevantsearch', {
					method: 'POST',
					body: JSON.stringify({
						query: qs[i]
					})
				})
					.then((res) => res.json())
					.then((res) => {
						reLinks = [...reLinks, ...res];
					}).then(() => {
						// remove duplicates
						reLinks = [...new Set(reLinks)];
					});
				
			}
			
		}
	});
</script>

<div class="space-x-1 overflow-y-auto m-4 bg-opacity-50 bg-black p-2 rounded-md h-[80%]">
	{#each reLinks as item}
		<li class="text-green-400 hover:underline break-words"><a href={item} target="_blank">{item}</a></li>
	{/each}
</div>

<style>
</style>
