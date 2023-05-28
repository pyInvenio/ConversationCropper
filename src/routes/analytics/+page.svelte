<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	let portfolio: HTMLCanvasElement;
	let portfolio2: HTMLCanvasElement;
	const data = {
		labels: [...Array(30).keys()].map((_, index) => (index + 1).toString()),
		datasets: [
			{
				label: 'Overall Revenue Impact',
				data: generateRandomData(30),
				fill: true,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};
	const data2 = {
		labels: [...Array(30).keys()].map((_, index) => (index + 1).toString()),
		datasets: [
			{
				label: 'Total Carbon Sequestered ',
				data: generateRandomData(30),
				fill: true,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};

	function generateRandomData(numPoints: number) {
		const data = [];
		let currentValue = getRandomNumberInRange(50, 80); // Starting value

		for (let i = 0; i < numPoints; i++) {
			currentValue += getRandomNumberInRange(5, 100); // Increase the value by a random increment
			data.push(currentValue);
		}

		return data;
	}

	function getRandomNumberInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const config = {
		type: 'line',
		data: data,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				}
			}
		}
	};
	const config2 = {
		type: 'line',
		data: data2,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				}
			}
		}
	};
	onMount(() => {
		const ctx = portfolio.getContext('2d');
		const myChart = new Chart(ctx, config);
		const ctx2 = portfolio2.getContext('2d');
		const myChart2 = new Chart(ctx2, config2);
	});
</script>

<div class="w-[80%] mx-auto grid grid-cols-6 gap-2 m-4">
    <a href="/" class="text-white font-medium">Home</a>
	<div class="col-span-3 col-start-2 text-white rounded-lg p-2 font-medium text-xl">
		<h1>Field Analytics</h1>
	</div>
</div>
<div class="w-[80%] mx-auto grid grid-cols-6 gap-2 m-4">
	<div class="col-span-1 col-start-1 bg-white rounded-lg p-6 flex flex-col">
		<h1 class="text-2xl font-bold border-b-[1px]">John Deere</h1>
		<a href="/dataview" class="my-2 mt-4 hover:underline">Profile</a>
		<a href="/analytics" class="mt-2 hover:underline">Field Analytics</a>
	</div>
	<div class="col-span-3 col-start-2 bg-white p-8 rounded-lg relative h-[36rem]">
		<div class="w-2/3">
			<canvas bind:this={portfolio} height={200} />
		</div>
		<div
			class="flex flex-row absolute inset-x-0 bottom-0 px-40 p-10 gap-4 left-0 right-0 justify-between"
		>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-4 bg-white text-green-900"
			>
				<h1 class="text-5xl">$15M</h1>
				<h1 class="pt-3">increased crop yield</h1>
			</div>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-4 bg-white text-green-900"
			>
				<h1 class="text-5xl">$1M</h1>
				<h1 class="pt-3">in carbon credits</h1>
			</div>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-4 bg-green-950 text-white"
			>
				<h1 class="text-5xl">$16M</h1>
				<h1 class="pt-3">to date</h1>
			</div>
		</div>
	</div>
	<div class="col-span-2 col-start-5 bg-white rounded-lg p-6 relative">
		<div class="w-2/3">
			<canvas bind:this={portfolio2} height={300} />
		</div>
		<div class="flex flex-row absolute inset-x-0 bottom-0 p-2 gap-4 left-0 right-0 justify-between">
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-4 bg-white text-green-900"
			>
				<h1 class="text-2xl">15tCO2</h1>
				<h1 class="pt-3">Greenpond CMC</h1>
			</div>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-4 bg-white text-green-900"
			>
				<h1 class="text-2xl">10tCO2</h1>
				<h1 class="pt-3">Greenpond Loop</h1>
			</div>
			<div
				class="rounded-lg shadow-lg shadow-black aspect-square items-center text-center p-4 bg-white text-green-900"
			>
				<h1 class="text-2xl">10tCO2</h1>
				<h1 class="pt-3">Bailey HQ</h1>
			</div>
		</div>
	</div>
	<div class="bg-white rounded-lg p-6 col-span-6">
		<h1 class="text-2xl font-medium mb-2">Insights for John Deere</h1>
		<li>Predicted drought in Dayton, Ohio - expected to interrupt sweet potato supply</li>
		<li>Recommended to switch to x instead of y fertilizer with increased nitrogen in soil</li>
		<table class="w-full text-center">
			<tr>
				<th>Field</th>
				<th>Lat/Long</th>
				<th>Acreage</th>
				<th>Crop</th>
				<th>pH Goal</th>
				<th>pH Max</th>
				<th>Planting</th>
				<th>Delivery Deadline</th>
				<th>Action Items</th>
			</tr>
			<tr>
				<td>Greenpond CMC</td>
				<td
					>45.05169230376719, <br />
					-88.10532518740628
				</td>
				<td>60 </td>
				<td> Potatoes </td>
				<td>6.5 </td>
				<td>7 </td>
				<td>6/20/2023 </td>
				<td>6/6/2023</td>
				<td>Rain Projected </td>
			</tr>
			<tr>
				<td>Greenpond Loop</td>
				<td
					>45.037735594116626, <br />
					-88.08546748675113
				</td>
				<td>40 </td>
				<td> Tobacco </td>
				<td>7 </td>
				<td>7.5 </td>
				<td>7/20/2023 </td>
				<td>7/6/2023 </td>
				<td>Rain Projected </td>
			</tr>
			<tr>
				<td>Bailey HQ</td>
				<td
					>37.075905799369266, <br />
					-78.6105186360637
				</td>
				<td>120 </td>
				<td> Sweet Potatoes </td>
				<td>5.5 </td>
				<td>6 </td>
				<td>5/20/2023 </td>
				<td>5/1/2023</td>
				<td>Rain Projected </td>
			</tr>
		</table>
	</div>
</div>
