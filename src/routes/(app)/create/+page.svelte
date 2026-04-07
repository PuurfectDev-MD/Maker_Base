<script lang="ts">
	import { Editor, isActive } from '@tiptap/core';
	import { onDestroy, onMount } from 'svelte';
	import './style.css';
	import { createEditor } from './editorConfig';
	import { goto } from '$app/navigation';
	import { saveToDb } from '../posts/posts.remote';

	let title = $state('');
	let isPublic = $state(true);
	let element: HTMLDivElement;
	let editor: Editor = $state(null!);
	let floatingMenuDiv: HTMLDivElement;

	let error = $state('');

	let posting = $state(false);
	let visbile_menu = $state(true);

	async function submitPost() {
		posting = true;
		let content = editor.getHTML();
		const { type, message } = await saveToDb({ content, title, isPublic });
		posting = false;

		console.log('type:' + type + 'message:' + message);
		if (type !== 'success') {
			error = message;
		} else {
			goto('/');
		}
	}
	onMount(() => {
		editor = createEditor(element, floatingMenuDiv, () => {
			editor = editor;
		});
	});

	onDestroy(() => editor?.destroy());
</script>

<div class="flex justify-end bg-red-500 p-3">
	<button class="cursor-pointer p-2" onclick={submitPost}>Submit</button>
</div>

<div class="mt-5 flex w-full flex-row justify-between">
	<label class="bg-amber-100 p-4 pl-6 text-2xl">
		Title:
		<input type="text" bind:value={title} />
	</label>

	<label for="checkbox" class="pr-6">
		Public
		<input type="checkbox" class="text-2xl" bind:checked={isPublic} />
	</label>
</div>

<div bind:this={element} class="editor mt-10 h-auto rounded-2xl p-0"></div>

<div bind:this={floatingMenuDiv} class="floating-menu">
	<button
		onclick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class="cursor-pointer p-3">Heading1</button
	>
	<button
		onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class="cursor-pointer p-3">Heading2</button
	>
	<button
		onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
		class="cursor-pointer p-3">Heading3</button
	>
	<button
		onclick={() => editor.chain().focus().toggleOrderedList().run()}
		class="cursor-pointer p-3">List</button
	>
</div>

{#if visbile_menu}
	<div
		class="option-menu w-max-[100%] fixed top-[50%] left-[-1vh] z-50 flex flex-col justify-center gap-y-4 rounded-2xl bg-amber-100 p-4 text-black"
	>
		<button class="cursor-pointer" onclick={() => editor.chain().focus().toggleBold().run()}
			>Bold</button
		>
		<button
			class="cursor-pointer {editor?.isActive('italic') ? 'isactive' : ''} "
			onclick={() => editor.chain().focus().toggleItalic().run()}>Itc</button
		>
		<button
			class="cursor-pointer {editor?.isActive('code') ? 'isactive' : ''}"
			onclick={() => editor.chain().focus().toggleCode().run()}>Code</button
		>

		<button
			class="cursor-pointer {editor?.isActive('orderedList') ? 'bg-red-400' : ''}"
			onclick={() => editor.chain().focus().toggleOrderedList().run()}>List</button
		>
		<button
			class="cursor-pointer {editor?.isActive('bulletList') ? 'isactive' : ''}"
			onclick={() => editor.chain().focus().toggleBulletList().run()}>Bullets</button
		>

		<button class="cursor-pointer" onclick={() => (visbile_menu = false)}> C </button>
	</div>
{:else}
	<div
		class="option-menu w-max-[100%] fixed bottom-0 left-[-1vh] z-50 flex flex-col justify-center gap-y-4 rounded-2xl bg-amber-100 p-4 text-black"
	>
		<button onclick={() => (visbile_menu = true)} class="cursor-pointer bg-red-300 p-2"> O </button>
	</div>
{/if}

{#if error}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{error}</p>
	</div>
{/if}
