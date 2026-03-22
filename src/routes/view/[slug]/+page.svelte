<script lang="ts">
	import { page } from '$app/state';
	import { getPostBySlug } from '../data.remote';
	const postPromise = getPostBySlug(page.params.slug!);
</script>

{#await postPromise}
	<p>Loading post...</p>
{:then result}
	{#if result.type == 'success'}
		<div class="flex w-full flex-col items-center justify-center gap-y-5 bg-amber-600 p-8">
			<div class="flex w-full flex-row">
				<h1 class="font-bol left-1/2 flex-1 text-center text-2xl">{result.post.title}</h1>
				<a href="/post/update/{result.post.isPublic}">Edit</a>
			</div>
			<p class="pt-8 text-lg">{result.post.content}</p>
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
