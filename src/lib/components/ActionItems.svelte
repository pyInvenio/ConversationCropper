<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { parsedData } from '../stores';

  let actionItems = [];

  onMount(() => {
    actionItems = sessionStorage.getItem('parsedData')['action_items'] || [];
    console.log('ActionItems', actionItems);
  });
</script>

<div class="space-x-1 overflow-y-auto m-4 bg-opacity-50 bg-black p-2 rounded-md h-[80%]">
	{#each actionItems as item}
		<li>{item}</li>
	{/each}
</div>

<style>
</style>
