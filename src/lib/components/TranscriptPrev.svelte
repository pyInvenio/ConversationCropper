<script>
	import { createEventDispatcher } from 'svelte';
	import { transcript } from '../stores';
	const dispatch = createEventDispatcher();

	let longString = $transcript;

	let highlightedPhrases = {};

	function handleClick(phrase) {
        if (highlightedPhrases[phrase]) {
            delete highlightedPhrases[phrase];
        } else {
            highlightedPhrases[phrase] = true;
        }
		// fetch('/api/define');
	}

	function handleTooltipClick(phrase) {
		// Trigger your function here
		console.log(`Function triggered for phrase: ${phrase}`);
	}
</script>

<div class="space-x-1 overflow-y-auto m-4 bg-opacity-70 bg-black p-2 rounded-md max-h-[90%]">
	{#each longString.split('\n') as paragraph, i}
		{#each paragraph.split(' ') as word, j}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				on:drag={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
					handleClick(word);
				}}
				class="hover:cursor-pointer hover:bg-black"
				>{word}
			</span>
		{/each}
	{/each}
</div>

<style>
	.highlight {
		background-color: yellow;
		cursor: pointer;
	}
</style>
