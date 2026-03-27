<script lang="ts">
	import { getPostByUser } from '../../../../view/data.remote';
	import { page } from '$app/state';

	let postPromise = getPostByUser(page.params.id!);
</script>

{#await postPromise}
	<p>Loading</p>
{:then result}
	{#if result.type == 'success'}
		<div class="flex flex-col gap-y-4 bg-red-400 text-white">
			{#each result.post as post}
				<a href="/view/{post.slug}">
					<div class="flex flex-col gap-y-4 bg-amber-200">
						<h1>{post.title}</h1>
						<p>{post.content}</p>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<h1>NO posts were fetchd</h1>
	{/if}
{/await}
