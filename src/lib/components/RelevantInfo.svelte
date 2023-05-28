<script>
	import { createEventDispatcher } from 'svelte';
	import { parsedData } from '../stores';
	let relinfo = $parsedData.relinfo || {};
</script>

<div class="space-x-1 overflow-y-auto m-4 bg-opacity-50 bg-black p-2 rounded-md h-[80%]">
	{#each relinfo as item}
		<li>{item}</li>
	{/each}
</div>

<style>
</style>
