<script lang="ts">
	import { page } from '$app/state';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import { createComment, getCommentByPost } from '../data.remote';

	let { data } = $props();

	$effect(() => {
		if (createComment.result?.type == 'success') {
			commenting = false;
			commentPosting = false;
			refreshComments();
		}
	});
	let commenting = $state(false);
	let commentPosting = $state(false);
	let commentPromise = $state(getCommentByPost(page.params.slug!));

	function refreshComments() {
		commentPromise = getCommentByPost(page.params.slug!);
	}
</script>

{#await commentPromise}
	<div class="comment-section rounded-x m-4 h-auto p-4">
		{#each Array(2) as _}
			<div class="p-3">
				<Skeleton></Skeleton>
				<Skeleton></Skeleton>
			</div>
		{/each}
	</div>
{:then response}
	<div class="comment-section rounded-x m-4 h-auto p-4">
		<h1>Comments</h1>
		<div class="flex justify-end">
			<button
				class="cursor-pointer rounded-xl bg-blue-900 px-3 py-1"
				onclick={() => (commenting = !commenting)}
			>
				+
			</button>
		</div>

		{#if commenting}
			<form {...createComment} class="mt-4 p-3">
				<input name="postSlug" value={page.params.slug} />
				<input name="userName" value={data.user.user_metadata.username} />
				<label>
					Comment:
					<input {...createComment.fields.content} name="content" />
				</label>

				<button type="submit" class="cursor-pointer rounded-xl px-3 py-2"
					>{commentPosting ? 'Sending' : 'Send'}</button
				>
			</form>

			{#if createComment.result?.type == 'db_error'}
				<p>There was an error in the db call</p>
			{:else}{/if}
		{/if}
		{#each response.Postcomment as comment}
			<div class="p-3">
				<p>{comment.comment}</p>
				<p>{comment.userName}</p>
			</div>
		{:else}
			<div class="flex justify-center p-3">
				<p class="p-3 text-white">No comments yet. Be the first!</p>
			</div>
		{/each}
	</div>
{/await}
