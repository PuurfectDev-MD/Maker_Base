<script lang="ts">
	import { LineChart, defaultChartPadding } from 'layerchart';

	import { onMount } from 'svelte';

	import CalendarActivity from './CalendarActivity.svelte';
	let { data } = $props();
	import AboutSkeleton from '$lib/components/AboutSkeleton.svelte';
</script>

<div class="my-5 grid grid-cols-2">
	<div>
		<img src="/images/image.png" class="w-fit p-3" />
	</div>

	<div class="card jusitfy-center flex flex-col">
		<h1>Username: {data.user.user_metadata.username}</h1>
		<h1>Email: {data.user.email}</h1>
		<h1>Number of posts: ____</h1>
		<h1>Number of dots: _____</h1>
		<h1>Account create at: _____</h1>
	</div>
</div>
{#await data.postsPerMonth}
	<AboutSkeleton showChart={true} />
{:then chartData}
	<div
		style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem;"
	>
		<LineChart
			data={chartData.data}
			x="date"
			y="value"
			padding={defaultChartPadding({ right: 10 })}
			height={300}
		/>
	</div>
{/await}

{#await data.postsPerDay}
	<AboutSkeleton showCalendar={true} />
{:then calendarData}
	<div
		style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; margin-top: 1.5rem;"
	>
		<CalendarActivity data={calendarData?.PostData} />
	</div>
{/await}
