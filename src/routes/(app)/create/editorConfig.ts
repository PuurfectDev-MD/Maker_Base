
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import FloatingMenu from '@tiptap/extension-floating-menu';
import { Editor } from '@tiptap/core';
export function createEditor(element: HTMLDivElement, floatingMenuDiv: HTMLDivElement, onTransaction: () => void): Editor {
    const editor = new Editor({
        element: element,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                    HTMLAttributes: {
                        class: 'editor_heading'
                    }
                },
                // undoRedo: false,
                paragraph: {
                    HTMLAttributes: {
                        class: 'editor_paragraph'
                    }
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'editor_bullets'
                    }
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'editor_ordered-lists'
                    }
                }
            }),
            Image,

            FloatingMenu.configure({
                element: floatingMenuDiv
            })
        ],

        content: `<p>Working on your next big thing?</p>`,
        onTransaction: () => {
            onTransaction();
        },
        editorProps: {
            handlePaste(view, event) {
                const items = event.clipboardData?.items
                if (!items) return false
                const imageItem = Array.from(items).find(item => item.type.startsWith('image/'))
                const file = imageItem?.getAsFile()
                const reader = new FileReader()

                reader.onload = (e) => {
                    editor.chain().focus().setImage({ src: e.target!.result as string }).run()
                }
                reader.readAsDataURL(file!);
                return true


            }
        }

    })

    return editor
}