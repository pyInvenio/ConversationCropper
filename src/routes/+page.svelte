<script lang="ts">
	import { goto } from '$app/navigation';
	import Tags from '../lib/components/Tags.svelte';
	import { tags, parsedData } from '../lib/stores';
	let fileInput: HTMLInputElement;
	let error = '';
	const upload = () => {
		const data = new FormData();
		console.log(fileInput.files);
		if (!fileInput.files || !fileInput.files[0]) {
			error = 'Please select a file';
			return;
		}
		data.append('file', fileInput.files[0]);
		console.log(data);
		fetch('/api/upload', {
			method: 'POST',
			body: data
		})
			.then((res) => res.json())
			.then((res) => {
				fetch('/api/transcribe', {
					method: 'POST',
					body: JSON.stringify({
						filepath: res.filepath
					})
				})
					.then((res) => res.json())
					.then((res) => {
						fetch('/api/parse', {
							method: 'POST',
							body: JSON.stringify({
								transcript: res.transcript,
								tags: $tags
							})
						})
							.then((res) => res.json())
							.then((res) => {
								$parsedData = res.json().data;
								goto('/dataview');
							})
							.catch((err) => {
								console.log(err);
								error = 'Something went wrong';
							});
					});
			});
	};
</script>

<div class="h-screen w-screen overflow-hidden flex items-center justify-center">
	<div
		class="mx-auto my-auto justify-center flex flex-col text-center align-middle w-1/2 h-1/4 text-white font-medium text-xl space-y-4"
	>
		<h1 class="text-4xl">Conversation Cropper</h1>
		<h1 class="text-lg font-normal">Get insights ASAP from your recordings with your farmers</h1>
		<div class="relative">
			<label
				for="file-upload"
				class="flex items-center justify-center px-4 py-2 bg-white text-green-500 rounded-md cursor-pointer"
			>
				<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
					<path
						d="M9 9H7V7h2V5H7V3H5v2H3v2h2v2h2V9zm5 4h2v2h-2v2H7v-2H5v-2h2v-2h2v2h2v2zm-3-2h2v-2h-2v2zm-5 0h2v-2H6v2zM3 9h2V7H3v2zm0-2V5h2V3H3zm0 10h2v-2H3v2zm14-6h-2v2h2v-2zm0-2v2h-2v2h2v2h2v-2h2v-2h-2zm0 4h-2v2h2v-2z"
					/>
				</svg>
				<span>Choose File</span>
			</label>
			<input
				bind:this={fileInput}
				type="file"
				class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
			/>
		</div>
		<div class="w-2/3 mx-auto">
			<Tags />
		</div>
		<button
			on:click={upload}
			class="rounded-md bg-green-500 hover:bg-green-600 transition-all md:w-1/4 mx-auto p-2"
			>Crop it!</button
		>
		{#if error}
			<p class="text-red-500">Error: {error}</p>
		{/if}
	</div>
</div>
