<script lang="ts">
	import { Editor } from '@tiptap/core';
	import Image from '@tiptap/extension-image';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	import './style.css';
	import FloatingMenu from '@tiptap/extension-floating-menu';
	import { createEditor } from './editorConfig';
	let element: HTMLDivElement;
	let editor: Editor;
	let floatingMenuDiv: HTMLDivElement;

	onMount(() => {
		editor = createEditor(element, floatingMenuDiv);
	});

	onDestroy(() => editor?.destroy());
</script>

<div class="option-menu flex flex-row gap-x-4 p-4">
	<button
		class="cursor-pointer"
		onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>Heading3</button
	>
	<button class="cursor-pointer" onclick={() => editor.chain().focus().toggleItalic().run()}
		>Italic</button
	>
	<button class="cursor-pointer" onclick={() => editor.chain().focus().toggleCode().run()}
		>Code</button
	>

	<button class="cursor-pointer" onclick={() => editor.chain().focus().toggleOrderedList().run()}
		>List</button
	>
	<button class="cursor-pointer" onclick={() => editor.chain().focus().toggleBulletList().run()}
		>Bullet List</button
	>

	<button></button>
</div>

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
<div bind:this={element} class=" editor mx-4 rounded-2xl p-0"></div>
