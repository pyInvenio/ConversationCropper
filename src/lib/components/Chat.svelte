<script lang="ts">
	import { onMount } from 'svelte';
	import Message from '$lib/components/Message.svelte';
    import {parsedData} from '$lib/stores';

	let text = '';
	let result = '';
	let messagesDiv: HTMLDivElement;

	let messages = [
		{
			text: "What can I help you with?",
			sender: 'gpt',
			loading: false
		}
	];

	const onSubmit = async () => {
		let userText = text;
		text = '';
		messages = [
			...messages,
			{
				text: userText,
				sender: 'user',
				loading: false
			}
		];
		messages = [
			...messages,
			{
				text: 'Thinking...',
				sender: 'gpt',
				loading: true
			}
		];
		setTimeout(() => {
			messagesDiv.scrollBy(0, messagesDiv.scrollHeight - messagesDiv.clientHeight + 100);
		}, 0);
		
		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				parsedData: $parsedData,
                message: userText
			})
		});

		let res = await response.json();

		messages = messages.slice(0, -1);
		messages = [
			...messages,
			{
				text: await res.answer,
				sender: 'gpt',
				loading: false
			}
		];
		if (res) {
			setTimeout(() => {
				messagesDiv.scrollBy(0, messagesDiv.scrollHeight - messagesDiv.clientHeight + 100);
			}, 0);
		}

		console.log(result);
	};

	onMount(() => {
		messagesDiv.scrollBy(0, messagesDiv.scrollHeight - messagesDiv.clientHeight);
	});
</script>

<div class="w-full h-full text-primary-50">
	<div
		class="w-full rounded-lg h-full mx-auto flex flex-col items-center justify-center bg-black bg-opacity-70 relative"
	>
		<div class="w-full absolute inset-0 top-10 max-h-[75%] h-[75%]">
			<div bind:this={messagesDiv} class="flex-col flex overflow-auto overflow-x-hidden h-full">
				{#each messages as message}
					<Message text={message.text} sender={message.sender} loading={message.loading} />
				{/each}
			</div>
		</div>
		<div class="w-2/3 mx-auto flex absolute inset-x-0 bottom-10 text-sm">
			<textarea
				name=""
				id=""
				cols="30"
				rows="10"
				bind:value={text}
				placeholder="Type your message here..."
				class="items-top h-14 w-full resize-none rounded-md border-2 border-green-500 bg-black p-3 pb-0 text-lg transition-all duration-300 ease-in-out placeholder:italic focus:outline-none"
				on:keydown={(e) => {
					console.log(e.key);
					if (e.key === 'Enter') {
						e.preventDefault();
						console.log('enter');
						onSubmit();
						text = '';
					}
				}
				
				}
			/>
			
		</div>
	</div>
</div>
