<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	let portfolio: HTMLCanvasElement;
	const data = {
		labels: ['1', '2', '3', '4', '5', '6', '7'],
		datasets: [
			{
				label: 'Enthusiasm %',
				data: [81, 65, 59, 80,  56, 55, 40].reverse(),
				fill: true,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};
	const config = {
		type: 'line',
		data: data,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: 'Growth'
				}
			}
		}
	};
	let overviewActive = 0;

	onMount(() => {
		const ctx = portfolio.getContext('2d');
		const myChart = new Chart(ctx, config);
	});
</script>

<div class="w-[80%] mx-auto grid grid-cols-6 gap-2 m-4">
    <a href="/" class="text-white font-medium">Home</a>
	<div class="col-span-3 col-start-2 text-white rounded-lg p-2 font-medium text-xl">
		<h1>Profile</h1>
	</div>
</div>
<div class="w-[80%] mx-auto grid grid-cols-6 gap-2 m-4">
	<div class="col-span-1 col-start-1 bg-white rounded-lg p-6 flex flex-col">
		<h1 class="text-2xl font-bold border-b-[1px]">John Deere</h1>
		<a href="/dataview" class="my-2 mt-4 hover:underline">Profile</a>
		<a href="/analytics" class="mt-2 hover:underline">Field Analytics</a>
	</div>
	<div class="col-span-3 col-start-2 bg-white rounded-lg p-6 relative h-[32rem]">
		<h1 class="text-xl font-medium border-b-[1px]">Overview</h1>
		<div class="flex-row flex gap-8 mt-4">
			<h1
				class="cursor-pointer hover:underline {!overviewActive
					? 'font-medium underline'
					: 'font-normal'}"
				on:click={() => (overviewActive = 0)}
			>
				Notes
			</h1>
			<h1
				class="cursor-pointer hover:underline {overviewActive
					? 'font-medium underline'
					: 'font-normal'}"
				on:click={() => (overviewActive = 1)}
			>
				Concerns
			</h1>
		</div>
		{#if !overviewActive}
			<div class="mt-4">
				John Deere is a small farmer in Dayton, Ohio. He is one of Lithos Carbon’s earliest
				customers. He prefers phone calls but is also proficient with email. John’s concerns include
				Manganese.
			</div>
		{:else}
			<div class="mt-4">John is concerned about the Manganese levels in his soil.</div>
		{/if}
		<div
			class="flex flex-row absolute inset-x-0 bottom-0 px-40 p-10 gap-4 left-0 right-0 justify-between"
		>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-7 bg-green-950 text-white"
			>
				<h1 class="text-5xl">10</h1>
				<h1 class="pt-3">calls</h1>
			</div>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-7 bg-white text-green-900"
			>
				<h1 class="text-5xl">4</h1>
				<h1 class="pt-3">site visits</h1>
			</div>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-7 bg-white text-green-900"
			>
				<h1 class="text-5xl">12</h1>
				<h1 class="pt-3">tons <br /> purchased</h1>
			</div>
		</div>
	</div>

	<div class="col-span-2 col-start-5 bg-white rounded-lg p-6">
		<div class="text-center mx-auto">
			<div
				class="text-white bg-green-950 rounded-full aspect-square max-w-[4rem] mx-auto text-3xl text-center pt-3"
			>
				JD
			</div>
			<h1 class="text-3xl font-bold">John Deere</h1>
			<h1>Dayton, Ohio</h1>
		</div>
		<div class="justify-between flex flex-row mt-10">
			<h1 class="text-xl font-bold">Latest Activities</h1>
			<h1 class="cursor-not-allowed">View all</h1>
		</div>
		<div class="flex flex-col">
			<div class="rounded-lg border-2 p-6 m-2">Call with Henry on XX/XX/XXXX</div>
			<div class="rounded-lg border-2 p-6 m-2">Call with Henry on XX/XX/XXXX</div>
		</div>
	</div>
	<div class="col-span-3 col-start-2 bg-white p-8 rounded-lg">
		<canvas bind:this={portfolio} height={100} />
	</div>
</div>
