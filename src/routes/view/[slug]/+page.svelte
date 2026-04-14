<script lang="ts">
	import CommentSection from './CommentSection.svelte';
	import ReactionSection from './ReactionSection.svelte';
	import { BlockNoteEditor } from '@blocknote/core';
	import '@blocknote/core/fonts/inter.css';
	import '@blocknote/ariakit/style.css';
	import { getPostBySlug } from '../data.remote.js';
	import { page } from '$app/state';
	import ViewPostSkeleton from '$lib/components/ViewPostSkeleton.svelte';

	let { data } = $props();
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
			<button class="p-2">Edit</button>
		</div>
		<div class="p-6">
			<div use:renderBlockNote={result.post.content} />
		</div>
	{/if}

	<ReactionSection {data} />
{/await}

<CommentSection {data} />
