<script lang="ts">
	import { Editor, isActive } from '@tiptap/core';
	import { onDestroy, onMount } from 'svelte';
	import './style.css';
	import { createEditor } from './editorConfig';
	import { goto } from '$app/navigation';
	import { saveToDb } from '../posts/posts.remote';
	import {
		GlobeSimpleIcon,
		GlobeSimpleXIcon,
		ArrowsOutLineVerticalIcon,
		XIcon,
		TextBIcon,
		TextItalicIcon,
		CodeIcon,
		ListBulletsIcon,
		ListNumbersIcon,
		TextHOneIcon,
		TextHTwoIcon,
		TextHThreeIcon
	} from 'phosphor-svelte';
	let title = $state('');
	let description = $state('');
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
		const { type, message } = await saveToDb({ content, title, isPublic, description });
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
		<button class=" cursor-pointer p-2" onclick={submitPost}>Submit</button>
		<label for="checkbox" class=" mr-2 flex items-center pr-6">
			Public?
			<input type="checkbox" class="mx-4 ml-3 text-2xl" bind:checked={isPublic} />
			{#if isPublic}
				<GlobeSimpleIcon size={24} />
			{:else}
				<GlobeSimpleXIcon size={24} />
			{/if}
		</label>
	</div>
</div>

<div bind:this={element} class="editor prose mt-10 h-auto rounded-2xl p-0"></div>

<div bind:this={floatingMenuDiv} class="floating-menu max-w-[600px]">
	<button
		onclick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class="cursor-pointer p-3"
		><TextHOneIcon
			size={24}
			weight={editor?.isActive('heading', { level: 1 }) ? 'fill' : 'regular'}
		/></button
	>
	<button
		onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class="cursor-pointer p-3"
		><TextHTwoIcon
			size={24}
			weight={editor?.isActive('heading', { level: 2 }) ? 'fill' : 'regular'}
		/></button
	>
	<button
		onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
		class="cursor-pointer p-3"
		><TextHThreeIcon
			size={24}
			weight={editor?.isActive('heading', { level: 3 }) ? 'fill' : 'regular'}
		/></button
	>
	<button
		onclick={() => editor.chain().focus().toggleOrderedList().run()}
		class="cursor-pointer p-3"
		><ListNumbersIcon
			size={24}
			weight={editor?.isActive('orderedList') ? 'fill' : 'regular'}
		/></button
	>
</div>

{#if visbile_menu}
	<div
		class="option-menu w-max-screen fixed top-[50%] z-50 flex flex-col items-center justify-center gap-y-4 rounded-2xl bg-[var(--bg-page)] text-black"
	>
		<button class="cursor-pointer" onclick={() => editor.chain().focus().toggleBold().run()}
			><TextBIcon size={24} weight={editor?.isActive('bold') ? 'fill' : 'regular'} /></button
		>
		<button
			class="cursor-pointer {editor?.isActive('italic') ? 'isactive' : ''} "
			onclick={() => editor.chain().focus().toggleItalic().run()}
		>
			<TextItalicIcon size={24} weight={editor?.isActive('italic') ? 'fill' : 'regular'} />
		</button>
		<button
			class="cursor-pointer {editor?.isActive('code') ? 'isactive' : ''}"
			onclick={() => editor.chain().focus().toggleCode().run()}
			><CodeIcon size={24} weight={editor?.isActive('code') ? 'fill' : 'regular'} />
		</button>

		<button
			class="cursor-pointer {editor?.isActive('orderedList') ? '[var(--bg-card)]' : ''}"
			onclick={() => editor.chain().focus().toggleOrderedList().run()}
			><ListNumbersIcon
				size={24}
				weight={editor?.isActive('orderedList') ? 'fill' : 'regular'}
			/></button
		>
		<button
			class="cursor-pointer {editor?.isActive('bulletList') ? 'isactive' : ''}"
			onclick={() => editor.chain().focus().toggleBulletList().run()}
			><ListBulletsIcon
				size={24}
				weight={editor?.isActive('bulletList') ? 'fill' : 'regular'}
			/></button
		>

		<button class="cursor-pointer" onclick={() => (visbile_menu = !visbile_menu)}>
			<XIcon size={24} />
		</button>
	</div>
{:else}
	<div
		class="option-menu w-max-[100%] rounded-2x fixed bottom-2 left-0 z-50 flex flex-col justify-center gap-y-4"
	>
		<button onclick={() => (visbile_menu = true)} class="cursor-pointer">
			<ArrowsOutLineVerticalIcon size={24} />
		</button>
	</div>
{/if}

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
