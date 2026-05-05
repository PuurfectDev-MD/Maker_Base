
import readmeContent from '$root/README.md?raw'
import { marked, type Tokens } from 'marked'

export function load() {
    const raw = readmeContent;

    // custom renderer to add id to headings
    const renderer = new marked.Renderer()
    renderer.heading = ({ text, depth }: Tokens.Heading) => {
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
        return `<h${depth} id="${id}">${text}</h${depth}>`
    }

    const html = marked(raw, { renderer })

    const headings: { id: string; text: string; level: number }[] = []
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    let match
    while ((match = headingRegex.exec(raw)) !== null) {
        const level = match[1].length
        const text = match[2].replace(/[*_`🔗]/g, '').trim()
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
        headings.push({ id, text, level })
    }

    return { content: html, headings }
}