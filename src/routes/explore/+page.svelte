<script lang="ts">
	let { data } = $props();
	const posts = $derived(data.posts);
	const errorMessage = $derived(data.error);
</script>

<h1>This is the explore page</h1>

{#if !errorMessage}
	<div class="grid grid-cols-3 bg-amber-950 p-4">
		{#each posts as post}
			<div class="m-4">
				<h1>{post.title}</h1>
				<h3>This a parapgrah</h3>
				<h3>Dots count {post.dots_count}</h3>
			</div>
		{/each}
	</div>
{:else}
	<p>There was an error</p>
{/if}
