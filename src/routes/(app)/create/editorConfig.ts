import { BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/ariakit/style.css';

export function createEditor(initialContent?: any[]) {
	return BlockNoteEditor.create({
		initialContent: initialContent ?? undefined,
		domAttributes: {
			editor: {
				class: 'bn-editor'
			}
		},
		uploadFile: async (file: File) => {
			// Convert image to base64 (mirrors your old paste handler)
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = (e) => resolve(e.target!.result as string);
				reader.readAsDataURL(file);
			});
		}
	});
}

export function createButton(text: string, onClick?: () => void) {
	const element = document.createElement('a');
	element.href = '#';
	element.text = text;
	element.style.margin = '10px';
	if (onClick) {
		element.addEventListener('click', (e) => {
			onClick();
			e.preventDefault();
		});
	}
	return element;
}
