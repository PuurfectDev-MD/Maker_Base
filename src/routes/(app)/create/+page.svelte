<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import './style.css';
	import { createEditor } from './editorConfig';
	import { goto } from '$app/navigation';
	import { saveToDb } from '../posts/posts.remote';
	import type { BlockNoteEditor } from '@blocknote/core';

	let title = $state('');
	let description = $state('');
	let isPublic = $state(true);
	let container: HTMLDivElement = null!;
	let editor: BlockNoteEditor;

	let error = $state('');
	let posting = $state(false);
	let isBold = $state(false);
	let isItalic = $state(false);
	let isCode = $state(false);

	// slash menu state
	let slashMenuVisible = $state(false);
	let slashMenuX = $state(0);
	let slashMenuY = $state(0);
	let slashQuery = $state('');
	let selectedIndex = $state(0);

	const allItems = [
		{
			name: 'Headings',
			items: [
				{
					label: 'Heading 1',
					icon: 'H1',
					action: (e: BlockNoteEditor) =>
						e.updateBlock(e.getTextCursorPosition().block, { type: 'heading', props: { level: 1 } })
				},
				{
					label: 'Heading 2',
					icon: 'H2',
					action: (e: BlockNoteEditor) =>
						e.updateBlock(e.getTextCursorPosition().block, { type: 'heading', props: { level: 2 } })
				},
				{
					label: 'Heading 3',
					icon: 'H3',
					action: (e: BlockNoteEditor) =>
						e.updateBlock(e.getTextCursorPosition().block, { type: 'heading', props: { level: 3 } })
				}
			]
		},

		{
			name: 'Basic Blocks',
			items: [
				{
					label: 'Bullet List',
					icon: '•',
					action: (e: BlockNoteEditor) =>
						e.updateBlock(e.getTextCursorPosition().block, { type: 'bulletListItem' })
				},
				{
					label: 'Numbered List',
					icon: '1.',
					action: (e: BlockNoteEditor) =>
						e.updateBlock(e.getTextCursorPosition().block, { type: 'numberedListItem' })
				},
				{
					label: 'Paragraph',
					icon: '¶',
					action: (e: BlockNoteEditor) =>
						e.updateBlock(e.getTextCursorPosition().block, { type: 'paragraph' })
				},
				{
					label: 'Image',
					icon: '🖼',
					action: (e: BlockNoteEditor) =>
						e.updateBlock(e.getTextCursorPosition().block, { type: 'image' })
				}
			]
		}
	];

	let filteredItems = allItems
		.map((group) => ({
			name: group.name,
			items: group.items.filter((item) =>
				item.label.toLowerCase().includes(slashQuery.toLowerCase())
			)
		}))
		.filter((group) => group.items.length > 0);

	let flatItems = filteredItems.flatMap((g) => g.items);

	async function submitPost() {
		posting = true;
		const content = JSON.stringify(editor.document);
		const { type, message } = await saveToDb({ content, title, isPublic, description });
		posting = false;
		if (type !== 'success') error = message;
		else goto('/');
	}

	function toggleBold() {
		editor.toggleStyles({ bold: !isBold });
	}
	function toggleItalic() {
		editor.toggleStyles({ italic: !isItalic });
	}
	function toggleCode() {
		editor.toggleStyles({ code: !isCode });
	}

	function setHeading(level: 1 | 2 | 3) {
		const block = editor.getTextCursorPosition().block;
		const isAlreadyHeading = block.type === 'heading' && (block.props as any).level === level;
		if (isAlreadyHeading) editor.updateBlock(block, { type: 'paragraph' });
		else editor.updateBlock(block, { type: 'heading', props: { level } });
	}

	function toggleOrderedList() {
		const block = editor.getTextCursorPosition().block;
		editor.updateBlock(block, {
			type: block.type === 'numberedListItem' ? 'paragraph' : 'numberedListItem'
		});
	}

	function toggleBulletList() {
		const block = editor.getTextCursorPosition().block;
		editor.updateBlock(block, {
			type: block.type === 'bulletListItem' ? 'paragraph' : 'bulletListItem'
		});
	}

	function selectItem(item: (typeof allItems)[0]['items'][0]) {
		// remove the /query text first
		const block = editor.getTextCursorPosition().block;
		editor.updateBlock(block, {
			content: (block.content as any[]).filter((c: any) => {
				if (c.type === 'text') {
					c.text = c.text.replace(/\/\S*$/, '');
				}
				return true;
			})
		});
		item.action(editor);
		slashMenuVisible = false;
		slashQuery = '';
		editor.focus();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!slashMenuVisible) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % flatItems.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (flatItems[selectedIndex]) selectItem(flatItems[selectedIndex]);
		} else if (e.key === 'Escape') {
			slashMenuVisible = false;
		}
	}

	onMount(() => {
		editor = createEditor();
		editor.mount(container);

		editor.onEditorContentChange(() => {
			const styles = editor.getActiveStyles();
			isBold = !!styles.bold;
			isItalic = !!styles.italic;
			isCode = !!styles.code;
		});

		// watch for slash key
		container.addEventListener('keyup', (e) => {
			const sel = window.getSelection();
			if (!sel || !sel.rangeCount) return;

			const range = sel.getRangeAt(0);
			const text = range.startContainer.textContent ?? '';
			const slashIndex = text.lastIndexOf('/');

			if (slashIndex !== -1) {
				slashQuery = text.slice(slashIndex + 1);
				selectedIndex = 0;

				// position menu near cursor
				const rect = range.getBoundingClientRect();
				slashMenuX = rect.left;
				slashMenuY = rect.bottom + window.scrollY + 8;
				slashMenuVisible = true;
			} else {
				slashMenuVisible = false;
				slashQuery = '';
			}
		});

		// close menu on click outside
		document.addEventListener('click', (e) => {
			if (!(e.target as HTMLElement).closest('.slash-menu')) {
				slashMenuVisible = false;
			}
		});
	});

	onDestroy(() => {
		editor?.mount(null as any);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Slash menu -->
{#if slashMenuVisible && flatItems.length > 0}
	<div class="slash-menu" style="position: absolute; left: {slashMenuX}px; top: {slashMenuY}px;">
		{#each filteredItems as group}
			<div class="slash-group">
				<div class="slash-group-title">{group.name}</div>

				{#each group.items as item}
					<button
						class="slash-item {flatItems[selectedIndex] === item ? 'selected' : ''}"
						onclick={() => selectItem(item)}
					>
						<span class="slash-icon">{item.icon}</span>
						<span>{item.label}</span>
					</button>
				{/each}
			</div>
		{/each}
	</div>
{/if}

<!-- Format sidebar -->
<div class="format-sidebar">
	<button class="format-btn {isBold ? 'active' : ''}" onclick={toggleBold}><b>B</b></button>
	<button class="format-btn {isItalic ? 'active' : ''}" onclick={toggleItalic}><i>I</i></button>
	<button class="format-btn {isCode ? 'active' : ''}" onclick={toggleCode}>&lt;/&gt;</button>
	<button class="format-btn" onclick={() => setHeading(1)}>H1</button>
	<button class="format-btn" onclick={() => setHeading(2)}>H2</button>
	<button class="format-btn" onclick={() => setHeading(3)}>H3</button>
	<button class="format-btn" onclick={toggleOrderedList}>1≡</button>
	<button class="format-btn" onclick={toggleBulletList}>☰</button>
</div>

<div class="flex max-w-full flex-row justify-between">
	<div class="flex flex-col p-4">
		<label class="w-full p-4 pl-6 text-2xl">
			Title:
			<input type="text" class="input-title" placeholder="How does ... work?" bind:value={title} />
		</label>
		<label class="flex items-center p-4 pl-6 text-2xl">
			Description:
			<input
				type="text"
				class="input-description ml-3"
				placeholder="Dont forget this :)"
				bind:value={description}
			/>
		</label>
	</div>
	<div class="flex flex-col gap-y-8 p-2">
		<button class="cursor-pointer p-2" onclick={submitPost}>Submit</button>
		<label for="checkbox" class="mr-2 flex items-center pr-6">
			Public?
			<input type="checkbox" class="mx-4 ml-3 text-2xl" bind:checked={isPublic} />
		</label>
	</div>
</div>

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
