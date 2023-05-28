<script>
	import { createEventDispatcher } from 'svelte';
	import { parsedData } from '../stores';
	let insights = $parsedData.insights || {};
</script>

<div class="space-x-1 overflow-y-auto m-4 bg-opacity-50 bg-black p-2 rounded-md h-[80%]">
	{#each insights as item}
		<li>{item}</li>
	{/each}
</div>

<style>
</style>
