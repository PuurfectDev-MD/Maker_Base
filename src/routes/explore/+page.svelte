<script lang="ts">
	import ExploreSkeleton from '$lib/components/ExploreSkeleton.svelte';
	let { data } = $props();
</script>

<h1 class="p-2 pl-8">Explore the top notes :)</h1>

{#await data.streamed.posts}
	<ExploreSkeleton />
{:then posts}
	{#if posts && posts.length > 0}
		<div class="grid min-h-screen grid-cols-1 items-stretch gap-8 p-4 md:grid-cols-3">
			{#each posts as post}
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
		<p>No posts found.</p>
	{/if}
{/await}
