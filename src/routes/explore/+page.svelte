<script lang="ts">
	import ExploreSkeleton from '$lib/components/ExploreSkeleton.svelte';

	let { data } = $props();
</script>

<h1 class="p-2 pl-8">Explore the top notes :)</h1>

{#await data.posts}
	<ExploreSkeleton></ExploreSkeleton>
{:then postsResult}
	{#if postsResult.type == 'success'}
		<div class=" grid-col-1 grid min-h-screen items-stretch gap-8 p-4 md:grid-cols-3">
			{#each postsResult.result as post}
				<div class="card flex h-full max-h-[300px] flex-col p-4 md:max-h-[400px]">
					<a href="/view/{post.slug}" class="!no-underline">
						<h1>{post.title}</h1>
						<h3 class="description pt-9">{post.description}</h3>
					</a>

					<div class="mt-auto flex flex-row justify-between">
						<h3>From {post.author_username}</h3>
						<h3>. {post.dots_count}</h3>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>There was an error</p>
	{/if}
{/await}
