<script lang="ts">
	import { Editor } from '@tiptap/core';
	import Image from '@tiptap/extension-image';
	import StarterKit from '@tiptap/starter-kit';
	import { onMount } from 'svelte';
	import './style.css';
	let element: HTMLDivElement;
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3],
						HTMLAttributes: {
							class: 'editor_heading'
						}
					},
					undoRedo: false,
					paragraph: {
						HTMLAttributes: {
							class: 'editor_paragraph'
						}
					}
				}),
				Image
			],
			content: `
		<h2>
              Hi there,
            </h2>
            <p>
              this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
            </p>
            <ul>
              <li>
                That’s a bullet list with one …
              </li>
              <li>
                … or two list items.
              </li>
            </ul>
            <p>
              Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
            </p>
		`,
			autofocus: true, // make the text editable
			editable: true, // make the text editable
			injectCSS: false
		});
	});
</script>

<h1>Create your next big thing</h1>

<div bind:this={element} class="w-screen"></div>
