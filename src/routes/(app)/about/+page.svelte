<script lang="ts">
	import { LineChart, defaultChartPadding } from 'layerchart';

	import CalendarActivity from './CalendarActivity.svelte';
	let { data } = $props();
	import AboutSkeleton from '$lib/components/AboutSkeleton.svelte';
	import { getPostCountPerDay, getPostCountPerMonth } from '../user.remote.js';
</script>

<div class="my-5 grid max-h-[400px] grid-cols-1 md:grid-cols-2">
	<div class="flex hidden h-full justify-center md:block">
		<div class="aspect-square h-full max-h-[350px] overflow-hidden rounded-full bg-red-500">
			<img
				src={data.user?.avatarUrl || '/images/image.png'}
				alt="Profile"
				class="h-full w-full object-cover"
				referrerpolicy="no-referrer"
			/>
		</div>
	</div>
	<div class="card jusitfy-center flex min-w-0 shrink flex-col">
		<h1 class="truncate">Username: {data.user.username}</h1>
		<h1 class="truncate">Email: {data.user.email}</h1>
		<div class="pt-3">
			<h1 class="truncate">Created at: {data.user.created_at}</h1>
			<h1 class="truncate">Updated at: {data.user.created_at}</h1>
		</div>
	</div>
</div>

{#await getPostCountPerMonth(data.user.id)}
	<AboutSkeleton showChart={true} />
{:then chartData}
	<h2 class="mt-4 p-4">Your Post Chart</h2>
	<div
		style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem;"
	>
		<LineChart
			data={chartData.postMCounts}
			x="date"
			y="value"
			padding={defaultChartPadding({ right: 10 })}
			height={300}
		/>
	</div>
{/await}

{#await getPostCountPerDay(data.user.id)}
	<AboutSkeleton showCalendar={true} />
{:then calendarData}
	<h2 class="mt-4 px-4 pt-4">Your Activity</h2>
	<div
		style="background:var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; margin-top: 1.5rem; color:var(--accent);"
	>
		<CalendarActivity data={calendarData?.PostDCounts} />
	</div>
{/await}
