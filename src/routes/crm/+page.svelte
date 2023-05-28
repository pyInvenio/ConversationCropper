<script>
	import CRMEntry from '$lib/components/CRMEntry.svelte';

	let entries = [
		{
			name: 'John Deere',
			links: [
				{ name: 'Profile', url: '/dataview' },
				{ name: 'Field Analytics', url: '/analytics' },
				// { name: 'Link 3', url: 'https://example.com/3' }
			]
		},
		// {
		// 	name: 'Don Joe',
		// 	links: [
		// 		{ name: 'Link 4', url: 'https://example.com/4' },
		// 		{ name: 'Link 5', url: 'https://example.com/5' },
		// 		{ name: 'Link 6', url: 'https://example.com/6' }
		// 	]
		// }
		// More entries...
	];
</script>

<div class="page">
	<h1>Your Customers</h1>
	{#each entries as { name, links }}
		<CRMEntry {name} {links} />
	{/each}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 20px;
	}

	h1 {
		font-size: 3em; /* Adjust this value to increase or decrease the text size */
		text-align: center;
		color: #ffffff;
	}
</style>
