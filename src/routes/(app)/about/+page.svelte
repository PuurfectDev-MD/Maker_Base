<script lang="ts">
	import { LineChart, defaultChartPadding } from 'layerchart';

	import { onMount } from 'svelte';

	let { data } = $props();
	let mounted = $state(false);
	onMount(() => (mounted = true));
	const chartData = $derived(data.postsPerMonth);
</script>

<div class="grid max-h-[80%] grid-cols-2">
	<div>
		<img src="/images/image.png" class="w-fit p-3" />
	</div>

	<div class="flex flex-col justify-start gap-y-6 bg-red-400 p-4 pt-10">
		<h1>Username: {data.user.user_metadata.username}</h1>
		<h1>Email: {data.user.email}</h1>
		<h1>Email: {data.user.email}</h1>
		<h1>Email: {data.user.email}</h1>
	</div>
</div>

{#if mounted}
	<LineChart
		class="mt-5 bg-white p-4 text-black"
		data={chartData}
		x="date"
		y="value"
		padding={defaultChartPadding({ right: 10 })}
		height={300}
	/>
{/if}
