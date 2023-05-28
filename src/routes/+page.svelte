<script lang="ts">
	import { goto } from '$app/navigation';
	import Tags from '../lib/components/Tags.svelte';
	import { tags, parsedData, transcript } from '../lib/stores';
  import { onMount } from 'svelte';
	let fileInput: HTMLInputElement;
	let error = '';
    let fileName = '';
	let state = '';
	const upload = () => {
		const data = new FormData();
		console.log(fileInput.files);
		if (!fileInput.files || !fileInput.files[0]) {
			error = 'Please select a file';
			return;
		}
		data.append('file', fileInput.files[0]);
		console.log(data);
		state = 'Uploading...';
		fetch('/api/upload', {
			method: 'POST',
			body: data
		})
			.then((res) => res.json())
			.then((res) => {
                console.log(res);
				state = 'Transcribing...';
				fetch('/api/transcribe', {
					method: 'POST',
					body: JSON.stringify({
						url: res.url
					})
				})
					.then((res) => res.json())
					.then((res) => {
                        console.log(res);
						state = 'Parsing, please wait...';
						$transcript = res.text;
						fetch('/api/parse', {
							method: 'POST',
							body: JSON.stringify({
								transcript: $transcript,
								tags: $tags
							})
						})
							.then((res) => res.json())
							.then((res) => {
								$parsedData = res.data;
                                console.log($parsedData);
                                console.log($transcript);
                sessionStorage.setItem('parsedData', res.data);
                sessionStorage.setItem('transcript', $transcript);
								goto('/postcall');
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
				{#if fileName}
					<h1>{fileName}</h1>
				{:else}
					<h1>Choose File</h1>
				{/if}
			</label>
			<input
				bind:this={fileInput}
				type="file"
				class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                on:change={() => fileName = fileInput.files[0].name}
			/>
		</div>
		<div class="w-2/3 mx-auto space-y-1">
            <h1>Categories</h1>
			<Tags />
		</div>
		<button
			on:click={upload}
			class="rounded-md bg-green-500 hover:bg-green-600 transition-all md:w-1/4 mx-auto p-2"
			>Crop it!</button
		>
		{#if state}
			<p class="text-green-500">{state}</p>
			<!-- loading icon -->
			<svg class="animate-spin h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
				viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
					3.042.546 5.918 1.537 8.536l2.002-1.245zM12 20a8 8 0 01-8-8H0c0 4.411
					3.589 8 8 8v-2zm8.463-9.245l2.002
					1.246A7.962 7.962 0 0020 12h-4c0 2.086-.81 4.059-2.28 5.545z">
				</path>
			</svg>
		{/if}
		{#if error}
			<p class="text-red-500">Error: {error}</p>
		{/if}
	</div>
</div>
