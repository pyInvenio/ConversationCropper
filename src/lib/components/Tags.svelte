<script lang="ts">
	// Initialize an array to store the tags
	let tags: string[] = [  ];
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

<div id="tag-manager">
	<div class="flex flex-wrap gap-2" bind:this={tagcontainer}>
		<!-- Tags will be dynamically inserted here -->
		{#each tags as tag, index}
			<div class="bg-gray-200 px-2 py-1 rounded flex items-center">
				<span class="mr-2">{tag}</span>
				<button class="text-red-500" on:click={() => removeTag(index)}>X</button>
			</div>
		{/each}
	</div>
	<div class="mt-2">
		<input
			type="text"
			bind:this={taginput}
			placeholder="Add a tag"
			class="border border-gray-300 px-2 py-1 rounded"
		/>
		<button bind:this={addtagbtn} class="bg-blue-500 text-white px-3 py-1 rounded" on:click={addTag}
			>Add Tag</button
		>
	</div>
</div>
