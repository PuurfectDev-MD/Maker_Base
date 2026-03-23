<script lang="ts">
	import { LineChart, defaultChartPadding } from 'layerchart';

	import { onMount } from 'svelte';

	let { data } = $props();
	let mounted = $state(false);
	onMount(() => (mounted = true));
	const chartData = $derived(data.postsPerMonth);
</script>

<h1>This is the user info page</h1>
<div class="flex flex-col gap-y-6 bg-red-400 p-4">
	<h1>Username: {data.user.user_metadata.username}</h1>
	<h1>Email: {data.user.email}</h1>
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
