<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import './style.css';
	import { createEditor } from './editorConfig';
	import { goto } from '$app/navigation';
	import { saveToDb } from '../posts/posts.remote';
	import type { BlockNoteEditor } from '@blocknote/core';
	import { slide, fly, fade } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	import { ArrowsOutLineVerticalIcon, XIcon } from 'phosphor-svelte';

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

	let slashMenuVisible = $state(false);
	let slashMenuX = $state(0);
	let slashMenuY = $state(0);
	let slashQuery = $state('');
	let selectedIndex = $state(0);

	let sidebarVisible = $state(true);
	const allItems = [
		{
			name: 'Headings',
			items: [
				{ label: 'Heading 1', icon: 'H1', type: 'heading', props: { level: 1 } },
				{ label: 'Heading 2', icon: 'H2', type: 'heading', props: { level: 2 } },
				{ label: 'Heading 3', icon: 'H3', type: 'heading', props: { level: 3 } }
			]
		},
		{
			name: 'Basic Blocks',
			items: [
				{ label: 'Bullet List', icon: '•', type: 'bulletListItem' },
				{ label: 'Numbered List', icon: '1.', type: 'numberedListItem' },
				{ label: 'Paragraph', icon: '¶', type: 'paragraph' }
			]
		}
	];

	let filteredItems = $derived(
		allItems
			.map((group) => ({
				name: group.name,
				items: group.items.filter((item) =>
					item.label.toLowerCase().includes(slashQuery.toLowerCase())
				)
			}))
			.filter((group) => group.items.length > 0)
	);

	let flatItems = $derived(filteredItems.flatMap((g) => g.items));

	$effect(() => {
		slashQuery;
		selectedIndex = 0;
	});

	function getBlockText(block: any): string {
		if (typeof block.content === 'string') return block.content;
		if (!Array.isArray(block.content)) return '';
		return block.content.map((c: any) => (c.type === 'text' ? c.text : '')).join('');
	}

	function selectItem(item: any) {
		const slashPattern = new RegExp(`\\/${slashQuery}`);

		const targetBlock = editor.document.find((b: any) => {
			const text = getBlockText(b);
			return slashPattern.test(text) || text.trim().startsWith('/');
		});

		const block = targetBlock ?? editor.getTextCursorPosition().block;
		const fullText = getBlockText(block);
		const cleanedText = fullText.replace(/\/[^\s]*$/, '').trim();

		const emptyContent = [{ type: 'text', text: '', styles: {} }];

		if (cleanedText === '') {
			editor.updateBlock(block, {
				type: item.type,
				props: item.props ?? {},
				content: emptyContent as any
			});

			const updated = editor.document.find((b: any) => b.id === block.id);
			if (updated) editor.setTextCursorPosition(updated, 'start');
		} else {
			editor.updateBlock(block, {
				type: 'paragraph',
				content: [{ type: 'text', text: cleanedText, styles: {} }] as any
			});

			const inserted = editor.insertBlocks(
				[{ type: item.type, props: item.props ?? {}, content: emptyContent as any }],
				block,
				'after'
			);

			const newBlock = editor.document.find((b: any) => b.id === inserted[0]?.id);
			if (newBlock) editor.setTextCursorPosition(newBlock, 'start');
		}

		slashMenuVisible = false;
		slashQuery = '';
		selectedIndex = 0;
		editor.focus();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!slashMenuVisible || flatItems.length === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % flatItems.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + flatItems.length) % flatItems.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			selectItem(flatItems[selectedIndex]);
		} else if (e.key === 'Escape') {
			slashMenuVisible = false;
		}
	}

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
		editor.updateBlock(
			block,
			isAlreadyHeading ? { type: 'paragraph' } : { type: 'heading', props: { level } }
		);
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

	onMount(() => {
		editor = createEditor();
		editor.mount(container);

		editor.onEditorContentChange(() => {
			const styles = editor.getActiveStyles();
			isBold = !!styles.bold;
			isItalic = !!styles.italic;
			isCode = !!styles.code;
		});

		container.addEventListener('keyup', (e: KeyboardEvent) => {
			if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) return;

			const sel = window.getSelection();
			if (!sel || !sel.rangeCount) return;

			const range = sel.getRangeAt(0);
			const textBeforeCursor = range.startContainer.textContent?.slice(0, range.startOffset) ?? '';
			const match = textBeforeCursor.match(/\/([^\s/]*)$/);

			if (match) {
				slashQuery = match[1];
				slashMenuVisible = true;
				const rect = range.getBoundingClientRect();
				slashMenuX = rect.left;
				slashMenuY = rect.bottom + window.scrollY + 8;
			} else {
				slashMenuVisible = false;
				slashQuery = '';
			}
		});

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

{#if slashMenuVisible && flatItems.length > 0}
	<div class="slash-menu" style="position: absolute; left: {slashMenuX}px; top: {slashMenuY}px;">
		{#each filteredItems as group}
			<div class="slash-group">
				<div class="slash-group-title">{group.name}</div>
				{#each group.items as item}
					<button
						class="slash-item {flatItems[selectedIndex]?.label === item.label ? 'selected' : ''}"
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

<!-- Format Sidebar -->
{#if sidebarVisible}
	<div
		class="format-sidebar"
		in:fly={{ y: -10, duration: 200, easing: expoOut }}
		out:fade={{ duration: 150 }}
	>
		<button class=" {isBold ? 'active' : ''}" onclick={toggleBold}><b>B</b></button>
		<button class={isItalic ? 'active' : ''} onclick={toggleItalic}><i>I</i></button>
		<button class=" {isCode ? 'active' : ''}" onclick={toggleCode}>&lt;/&gt;</button>
		<button onclick={() => setHeading(1)}>H1</button>
		<button onclick={() => setHeading(2)}>H2</button>
		<button onclick={() => setHeading(3)}>H3</button>
		<button onclick={toggleOrderedList}>1≡</button>

		<button onclick={() => (sidebarVisible = !sidebarVisible)}
			><ArrowsOutLineVerticalIcon size={24}></ArrowsOutLineVerticalIcon></button
		>
	</div>
{:else}
	<div class="absolute bottom-0 left-5">
		<button onclick={() => (sidebarVisible = !sidebarVisible)}><XIcon size={24}></XIcon></button>
	</div>
{/if}

<!-- Top Controls -->
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

<!-- Editor -->
<div bind:this={container} class="editor mt-10 h-auto rounded-2xl"></div>

<!-- Error -->
{#if error}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{error}</p>
	</div>
{/if}

<!-- Posting -->
{#if posting}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-green-300 text-white shadow-lg md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">Sending it to the world ...</p>
	</div>
{/if}
