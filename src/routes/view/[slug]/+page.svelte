<script lang="ts">
	import { page } from '$app/state';
	import { getPostBySlug } from '../data.remote';
	const postPromise = getPostBySlug(page.params.slug!);
</script>

{#await postPromise}
	<p>Loading post...</p>
{:then result}
	{#if result.type == 'success'}
		<div class="flex w-full flex-row items-center gap-y-5 bg-amber-600 p-8">
			<h1>{result.post.title}</h1>
			<button class="ml-auto">Edit</button>
		</div>
		<div>
			{@html result.post.content}
		</div>
	{:else if result.type == 'db_error'}
		<div
			class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
		>
			<p class="px-8 py-4 text-xl md:text-2xl">{result.message}</p>
		</div>
	{:else if result.type == 'unauthorized'}
		<div
			class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
		>
			<p class="px-8 py-4 text-xl md:text-2xl">{result.message}</p>
		</div>
	{/if}
{/await}
