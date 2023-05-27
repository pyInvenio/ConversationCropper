<script lang="ts">
	// Initialize an array to store the tags
	let tags: string[] = [
		'enthusiasm',
		'topic',
		'ph-range',
		'ph-limit',
		'ph-target',
		'manganese-level',
		'timeline',
		'weather',
		'delivery-method'
	];
	let tagcontainer: HTMLDivElement;
	let taginput: HTMLInputElement;
	let addtagbtn: HTMLButtonElement;
	// Function to add a new tag
	function addTag() {
		const newTag = taginput.value.trim();

		if (newTag !== '' && !tags.includes(newTag)) {
			tags = [...tags, newTag];
			taginput.value = '';
		}
	}

	// Function to remove a tag
	function removeTag(index: number) {
		tags = tags.filter((_, i) => i !== index);
	}
</script>

<div id="tag-manager" class="rounded-lg bg-black bg-opacity-70 text-sm p-2">
	<div class="flex flex-wrap gap-2 justify-center" bind:this={tagcontainer}>
		<!-- Tags will be dynamically inserted here -->
		{#each tags as tag, index}
			<div
				class="bg-gray-900 px-2 py-1 rounded flex items-center text-green-400 bg-opacity-60 hover:bg-green-900 hover:bg-opacity-60"
			>
				<span class="mr-2">{tag}</span>
				<button class="text-white" on:click={() => removeTag(index)}>x</button>
			</div>
		{/each}
	</div>
	<div class="mt-2">
		<input
			type="text"
			bind:this={taginput}
			placeholder="Add a tag"
			class="border border-gray-300 px-2 py-1 rounded text-green-200 bg-black border-none focus:border-none"
			on:keydown={(e) => {
                
				if (e.key === 'Enter') {
					addTag();
				}
			}}
		/>
		<button
			bind:this={addtagbtn}
			class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all "
			on:click={addTag}>Add Tag</button
		>
	</div>
</div>
