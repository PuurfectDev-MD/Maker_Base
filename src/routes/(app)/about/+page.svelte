<script lang="ts">
	import { LineChart, defaultChartPadding } from 'layerchart';

	import CalendarActivity from './CalendarActivity.svelte';
	let { data } = $props();
	import AboutSkeleton from '$lib/components/AboutSkeleton.svelte';
	import { getPostCountPerDay, getPostCountPerMonth } from '../user.remote.js';
</script>

<div class="my-5 grid max-h-[400px] grid-cols-2">
	<div class="flex hidden h-full items-center justify-center md:block">
		<div class="aspect-square h-full max-h-[350px] overflow-hidden rounded-full bg-red-500">
			<img
				src={data.user?.avatarUrl || '/images/image.png'}
				alt="Profile"
				class="h-full w-full object-cover"
				referrerpolicy="no-referrer"
			/>
		</div>
	</div>
	<div class="card jusitfy-center flex shrink flex-col">
		<h1>Username: {data.user.username}</h1>
		<h1>Email: {data.user.email}</h1>
		<h1>Verified:{data.user.emailVerified ? 'Yes' : 'No'}</h1>
		<h1>Number of posts: ____</h1>
		<h1>Number of dots: _____</h1>
		<h1>Account created at: {data.user.created_at}</h1>
	</div>
</div>

{#await getPostCountPerMonth(data.user.id)}
	<AboutSkeleton showChart={true} />
{:then chartData}
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
	<div
		style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; margin-top: 1.5rem;"
	>
		<CalendarActivity data={calendarData?.PostDCounts} />
	</div>
{/await}
