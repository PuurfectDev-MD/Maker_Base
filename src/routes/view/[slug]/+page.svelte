<script lang="ts">
	import { page } from '$app/state';
	import { getPostBySlug } from '../data.remote';
	const postPromise = getPostBySlug(page.params.slug!);
</script>

{#await postPromise}
	<p>Loading post...</p>
{:then post}
	<div class="flex w-full flex-col items-center justify-center gap-y-5 p-8">
		<div class="flex w-full flex-row">
			<h1 class="font-bol left-1/2 flex-1 text-center text-2xl">{post?.title}</h1>
			<a href="/post/update/{post?.isPublic}">Edit</a>
		</div>
		<p class="pt-8 text-lg">{post?.content}</p>
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}
