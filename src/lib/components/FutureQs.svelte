<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { parsedData } from '../stores';
	let questions = [];

	onMount(() => {
		let json = JSON.parse(sessionStorage.getItem('parsedData'));
		questions = JSON.parse(sessionStorage.getItem('parsedData'))['future_questions'] || [];
	});
</script>

<div class="space-x-1 overflow-y-auto m-4 bg-opacity-50 bg-black p-2 rounded-md h-[80%]">
	{#each questions as item}
		<li>{item}</li>
	{/each}
</div>

<style>
</style>
