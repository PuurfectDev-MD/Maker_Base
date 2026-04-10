<script lang="ts">
	import HomeSkeleton from '$lib/components/HomeSkeleton.svelte';

	let { data } = $props();
</script>

{#await data.result}
	<HomeSkeleton></HomeSkeleton>
{:then info}
	{#if info.type == 'success'}
		<h1 class="mt-4 p-3 text-7xl!">Hello, {data.user.user_metadata.username}</h1>
		<div class=" px-4 py-2">
			<h3>You have written {info.totalCount} notes across ___ topics.</h3>
		</div>

		<div class="mt-4 flex max-w-full justify-evenly p-3">
			<div class="card w-1/5">
				<h1 class="pt-2 text-7xl!">{info.totalCount}</h1>
				<h2 class="pt-4">Notes written</h2>
			</div>
			<div class="card w-1/5">
				<h1 class="pt-2 text-7xl!">X</h1>
				<h2 class="pt-4">Dots recieved</h2>
			</div>
			<div class="card w-1/5">
				<h1 class="pt-2 text-7xl!">Y</h1>
				<h2 class="pt-4">Words written</h2>
			</div>
			<div class="card w-1/5">
				<h1 class="pt-2 text-7xl!">Z</h1>
				<h2 class="pt-4">Streak</h2>
			</div>
		</div>

		<div
			class="mx-4 my-6 flex max-w-full items-center justify-between rounded-lg bg-[var(--bg-card)] px-4 py-6"
		>
			<div class="flex flex-col gap-y-2">
				<h2 class="text-xl font-bold">What did you learn today?</h2>
				<p class="text-sm">Start a new note and save your knowledge to come back to it later.</p>
			</div>

			<div class="flex items-center">
				<a
					href="/create"
					class="rounded-sm border border-[var(--primary-color)] px-4 py-2 transition-colors hover:bg-[var(--bg-page)] hover:no-underline!"
				>
					Create
				</a>
			</div>
		</div>

		<h3 class="mt-6 px-8 py-2">Your recent notes</h3>

		<div class="flex max-w-full px-4 py-2">
			{#each info.posts as post}
				<div class="card mx-4 flex h-full max-h-[50%] flex-col">
					<a href="/view/{post.slug}" class="!no-underline">
						<h1>{post.title}</h1>
						<h3 class="description pt-5">{post.description}</h3>
					</a>

					<div class="mt-7 flex flex-row justify-between">
						<h3>From {post.author_username}</h3>
						<h3>. {post.dots_count}</h3>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-4 mb-6 bg-[var(--bg-card)] pb-3 opacity-50">
			<div class=" mr-3 flex justify-end">
				<a
					href=""
					class="my-3 rounded-sm border-2 px-3 py-2 hover:bg-[var(--bg-card)] hover:no-underline!"
					>Add new</a
				>
			</div>

			<div class="my-4 flex items-center justify-center-safe">
				<h2 class="px-4">Your tags -></h2>
				<div class="tag">
					<h3>I2C</h3>
				</div>
				<div class="tag">
					<h3>I2C</h3>
				</div>
				<div class="tag">
					<h3>I2C</h3>
				</div>
				<div class="tag">
					<h3>I2C</h3>
				</div>
			</div>

			<h1 class="py-4 text-center">Coming soon!</h1>
		</div>
	{/if}
{/await}
