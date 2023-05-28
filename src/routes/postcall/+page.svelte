<script lang="ts">
	import { transcript } from '../../lib/stores';
	import TranscriptPrev from '../../lib/components/TranscriptPrev.svelte';
	import ActionItems from '$lib/components/ActionItems.svelte';
	import FutureQs from '$lib/components/FutureQs.svelte';
	import RelevantInfo from '$lib/components/RelevantInfo.svelte';
	import ParsedInsights from '$lib/components/ParsedInsights.svelte';
	import Chat from '$lib/components/Chat.svelte';
</script>

<div class="flex flex-col w-full h-screen text-white">
    <div class="w-full" >
        <a href="/"><button class=" float-left bg-green-700 bg-opacity-50 rounded-sm m-1 p-1 hover:bg-green-900 transition-all">Back Home</button></a>
        <h1 class="text-3xl m-2 text-center">Conversation Overview</h1>
    </div>
	<div class="flex flex-row w-full h-[90%]">
		<div class="w-1/3 p-2 bg-green-700 bg-opacity-60 rounded-md m-2">
			<h1 class="text-center text-2xl">Transcript</h1>
			<TranscriptPrev />
		</div>
		<div class="w-2/3 m-2 flex flex-row">
			<div class="w-1/2 flex flex-col">
				<div class="h-1/3 m-1 bg-green-700 bg-opacity-60 rounded-md">
					<h1 class="text-center text-2xl">Action Items</h1>
					<!-- <ActionItems /> -->
				</div>
				<div class="h-1/3 m-1 bg-green-700 bg-opacity-60 rounded-md">
					<h1 class="text-center text-2xl">Parsed Insights</h1>
					<!-- <ParsedInsights /> -->
				</div>
				<div class="h-1/3 m-1 bg-green-700 bg-opacity-60 rounded-md">
					<h1 class="text-center text-2xl">Relevant Information</h1>
					<!-- <RelevantInfo /> -->
				</div>
			</div>
			<div class="w-1/2 flex flex-col">
				<div class="h-1/3 m-1 bg-green-700 bg-opacity-60 rounded-md">
					<h1 class="text-center text-2xl">Questions to Ask Next Time</h1>
					<!-- <FutureQs /> -->
				</div>
				<div class="h-2/3 m-1 bg-green-700 bg-opacity-60 rounded-md">
					<Chat />
				</div>
			</div>
		</div>
	</div>
	<div class="w-full" >
        <button class="w-1/4 float-right bg-green-700 bg-opacity-90 rounded-md m-1 py-1 hover:bg-green-900 transition-all">Continue to Dashboard</button>
    </div>
</div>
