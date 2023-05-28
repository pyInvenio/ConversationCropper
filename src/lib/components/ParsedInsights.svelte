<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { parsedData } from '../stores';
	let insights = {};
	onMount(() => {
		let json = JSON.parse(sessionStorage.getItem('parsedData'));
		for (let key in json) {
			if (key != 'action_items' && key != 'future_questions' && key != 'queries') {
				if (key == 'mentioned' || key == 'unmentioned' || key == 'issues_and_blockers') {
					for (let topic in json[key]) {
						insights[topic] = json[key][topic]; // sets data to [Object object]
						insights[topic]['data'] = displayJSON(json[key][topic]['data']);
						insights[topic]['frequency'] = json[key][topic]['mentions'];
					}
				} else {
					insights[key] = json[key];
				}
			}
		}
		console.log(insights);
	});

	function displayJSON(data) {
    if (Object.keys(data).length === 0) {
      return 'No data found';
    }

		let result = '';
		for (const key in data) {
			if (Array.isArray(data[key])) {
				result += `${key}: ${data[key].join(', ')}, `;
			} else {
				result += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${data[key]}, `;
			}
		}

		// Remove the trailing comma and space
		result = result.slice(0, -2);

		return result;
	}
</script>

<div class="space-x-1 overflow-y-auto m-4 bg-opacity-50 bg-black p-2 rounded-md h-[80%]">
	<table>
		<thead class="border-b font-medium dark:border-neutral-500">
			<tr>
				<th scope="col" class="px-6 py-4">Category</th>
				<th scope="col" class="px-6 py-4">Data</th>
				<th scope="col" class="px-6 py-4">Frequency</th>
				<th scope="col" class="px-6 py-4">Sentences</th>
			</tr>
		</thead>
		{#each Object.keys(insights) as key}
			{#if insights[key]}
				<tr class="my-1">
					<td class="whitespace-nowrap px-6 py-4">{key}</td>
					<td class="whitespace-nowrap px-6 py-4">{insights[key].data}</td>
					<td class="whitespace-nowrap px-6 py-4">{insights[key].frequency}</td>
					<td class="whitespace-nowrap px-6 py-4">{insights[key].sentences}</td>
				</tr>
			{/if}
		{/each}
	</table>
</div>
