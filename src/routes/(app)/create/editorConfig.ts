import { BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/ariakit/style.css';

export function createEditor(initialContent?: any[]): BlockNoteEditor {
	return BlockNoteEditor.create({
		initialContent: initialContent ?? undefined,
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
