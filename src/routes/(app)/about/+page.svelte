<script lang="ts">
	import { LineChart, defaultChartPadding } from 'layerchart';

	import CalendarActivity from './CalendarActivity.svelte';
	let { data } = $props();
	import AboutSkeleton from '$lib/components/AboutSkeleton.svelte';
	import { getPostCountPerDay, getPostCountPerMonth, getUserAboutPage } from '../user.remote.js';
	import Skeleton from '$root/src/lib/components/Skeleton.svelte';
</script>

<div class="flex gap-x-6 p-2">
	<div class="flex flex-col justify-start gap-y-3">
		<div class="flex flex-col items-center gap-x-2">
			<div
				class="aspect-square h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-[var(--border)]"
			>
				<img
					src={data.user?.avatarUrl || '/images/image.png'}
					alt="Profile"
					class="h-full w-full object-cover"
					referrerpolicy="no-referrer"
				/>
			</div>
			<div class="text-center">
				<h3 class="pt-3 font-semibold">{data.user.username}</h3>
				<p class="text-sm opacity-70">{data.user.email}</p>
			</div>
		</div>
		<div class="flex flex-col gap-y-4 text-center">
			{#await getUserAboutPage(data.user.id)}
				<div class="flex flex-col items-center">
					<Skeleton height="2rem" width="6rem"></Skeleton>
					<p>Notes</p>
				</div>

				<div class="flex flex-col items-center">
					<Skeleton height="2rem" width="6rem"></Skeleton>
					<p>Words Written</p>
				</div>
				<div class="flex flex-col items-center">
					<Skeleton height="2rem" width="6rem"></Skeleton>
					<p>Dots</p>
				</div>
				<div class="flex flex-col items-center">
					<Skeleton height="2rem" width="6rem"></Skeleton>
					<p>Streak</p>
				</div>
				<div class="flex flex-col items-center">
					<Skeleton height="2rem" width="6rem"></Skeleton>
					<p>Longest Streak</p>
				</div>
			{:then result}
				<div>
					<h1>{result.postCount}</h1>
					<p>Notes</p>
				</div>

				<div>
					<h1>{result.totalWordsCount}</h1>
					<p>Words Written</p>
				</div>
				<div>
					<h1>{result.dotsCount}</h1>
					<p>Dots</p>
				</div>
				<div>
					<h1>{result.currentStreak}</h1>
					<p>Streak</p>
				</div>

				<div>
					<h1>{result.longestStreak}</h1>
					<p>Longest Streak</p>
				</div>
			{/await}
		</div>

		<div class="grid-row-3 grid gap-y-3 pt-3 text-center">
			<a
				class="rounded-[4px] border border-[var(--primary-color)] px-3 py-2 no-underline! hover:bg-[var(--bg-card)]"
				href="/posts/viewall/{data.user.id}">Posts</a
			>
			<a
				class="rounded-[4px] border border-[var(--primary-color)] px-3 py-2 no-underline! hover:bg-[var(--bg-card)]"
				href="/create/tag">Tags</a
			>
			<a
				class="rounded-[4px] border border-[var(--primary-color)] px-3 py-2 no-underline! hover:bg-[var(--bg-card)]"
				href="/setting">Change Username</a
			>
		</div>
	</div>

	<div class="flex w-full flex-col gap-y-4 pb-4">
		{#await getPostCountPerMonth(data.user.id)}
			<AboutSkeleton showChart={true} />
		{:then chartData}
			<h2 class="mt-4 p-4">Notes Freqeuncy over the month</h2>
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
				<CalendarActivity
					data={calendarData.PostDCounts?.map((item) => ({
						...item,
						date: new Date(item.date)
					}))}
				/>
			</div>
		{/await}
	</div>
</div>
