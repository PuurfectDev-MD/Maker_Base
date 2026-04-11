<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import './style.css';
	import { createEditor } from './editorConfig';
	import { goto } from '$app/navigation';
	import { saveToDb } from '../posts/posts.remote';
	// import { GlobeSimpleIcon, GlobeSimpleXIcon } from 'phosphor-svelte';
	import type { BlockNoteEditor } from '@blocknote/core';

	let title = $state('');
	let description = $state('');
	let isPublic = $state(true);
	let container: HTMLDivElement = null!;
	let editor: BlockNoteEditor;

	let error = $state('');
	let posting = $state(false);

	async function submitPost() {
		posting = true;
		// BlockNote stores blocks as JSON — serialize to string for DB
		const content = JSON.stringify(editor.document);
		const { type, message } = await saveToDb({ content, title, isPublic, description });
		posting = false;

		if (type !== 'success') {
			error = message;
		} else {
			goto('/');
		}
	}

	onMount(() => {
		editor = createEditor();
		editor.mount(container);
	});

	onDestroy(() => {
		editor?.mount(container);
	});
</script>

<div class="flex max-w-full flex-row justify-between">
	<div class="flex flex-col p-4">
		<label class="w-full p-4 pl-6 text-2xl">
			Title:
			<input
				type="text"
				class="input-title"
				placeholder="How does  ......  work ?"
				bind:value={title}
			/>
		</label>
		<label class="flex items-center p-4 pl-6 text-2xl">
			Description:
			<input
				type="text"
				class="input-description ml-3"
				placeholder="Dont forget this .... :)"
				bind:value={description}
			/>
		</label>
	</div>

	<div class="flex flex-col gap-y-8 p-2">
		<button class="cursor-pointer p-2" onclick={submitPost}>Submit</button>
		<label for="checkbox" class="mr-2 flex items-center pr-6">
			Public?
			<input type="checkbox" class="mx-4 ml-3 text-2xl" bind:checked={isPublic} />
			<!-- {#if isPublic}
				<GlobeSimpleIcon size={24} />
			{:else}
				<GlobeSimpleXIcon size={24} />
			{/if} -->
		</label>
	</div>
</div>

<!-- BlockNote mounts here — no floatingMenuDiv needed, slash menu is built-in -->
<div bind:this={container} class="editor mt-10 h-auto rounded-2xl"></div>

{#if error}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{error}</p>
	</div>
{/if}

{#if posting}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-green-300 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">Sending it to the world ...</p>
	</div>
{/if}
