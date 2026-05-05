<script lang="ts">
	import CommentSection from './CommentSection.svelte';
	import ReactionSection from './ReactionSection.svelte';
	import { BlockNoteEditor } from '@blocknote/core';
	import '@blocknote/core/fonts/inter.css';
	import '@blocknote/ariakit/style.css';
	import { getPostBySlug, getTagsByPostSlug } from '../data.remote.js';
	import { page } from '$app/state';
	import ViewPostSkeleton from '$lib/components/ViewPostSkeleton.svelte';

	let { data } = $props();
	let error = $state('');
	const postTagsPromise = getTagsByPostSlug(page.params.slug!);
	const postPromise = getPostBySlug(page.params.slug!);
	function renderBlockNote(container: HTMLElement, content: string) {
		let blocks;
		try {
			blocks = JSON.parse(content);
		} catch {
			blocks = undefined;
		}

		const editor = BlockNoteEditor.create({ initialContent: blocks });
		editor.mount(container);
		editor.isEditable = false;

		return {
			destroy() {
				editor.mount(null);
			}
		};
	}
</script>

{#await postPromise}
	<ViewPostSkeleton />
{:then result}
	{#if result.type == 'success'}
		<div class="flex w-full flex-row items-center justify-between p-4">
			<h1 class="p-2">{result.post.title}</h1>

			{#if data?.user?.id == result.post.author_id}
				<a
					href="/create/update/{result.post.id}"
					class=" bg-[var(--accent)] p-2 text-[var(--text-on-accent)]!">Edit</a
				>
			{/if}
		</div>
		<div class="px-6">
			<h3 class="px-2 opacity-85">{result.post.description}</h3>
		</div>

		{#await postTagsPromise}
			<p>Loading tags ....</p>
		{:then Tagresult}
			{#if Tagresult.type == 'success'}
				<div class="mx-3 flex justify-start gap-x-4 p-4">
					{#each Tagresult.tags as tag}
						<div class="tag">
							<p>{tag.name}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p>Loading tags ....</p>
			{/if}
		{/await}
		<div class="p-6">
			<div use:renderBlockNote={result.post.content} />
		</div>
	{/if}

	<ReactionSection {data} />
{/await}

<CommentSection {data} />
