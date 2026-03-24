<script lang="ts">
	import { Editor, isActive } from '@tiptap/core';
	import { onDestroy, onMount } from 'svelte';
	import './style.css';
	import { createEditor } from './editorConfig';

	let element: HTMLDivElement;
	let editor: Editor = $state(null!);
	let floatingMenuDiv: HTMLDivElement;

	onMount(() => {
		editor = createEditor(element, floatingMenuDiv, () => {
			editor = editor;
		});
	});

	onDestroy(() => editor?.destroy());
</script>

<div bind:this={element} class="editor mx-4 mt-10 h-auto rounded-2xl p-0"></div>

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

<div
	class="option-menu fixed top-[50%] left-[-1vh] z-50 flex flex-col justify-center gap-y-4 rounded-2xl bg-amber-100 p-4 text-black"
>
	<button
		class="cursor-pointer"
		onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button
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
</div>
