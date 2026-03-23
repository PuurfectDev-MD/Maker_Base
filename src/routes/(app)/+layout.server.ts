import { getRequestEvent } from '$app/server'
import { redirect } from '@sveltejs/kit'


export async function load({ locals }) {
    if (!locals.user?.id) {
        redirect(303, "/auth/signup")
    }

    const resultForPost = await getPostCountPerMonth(locals.user.id)

    return {
        user: locals.user,
        postsPerMonth: resultForPost.type == "success" ? resultForPost.data : {}

    }
}


async function getPostCountPerMonth(author_id: string) {
    const event = getRequestEvent()
    const user_id = event.locals.user.id
    if (user_id !== author_id) {
        return { type: "unauthorized", message: "You are not the author to access posts" }
    }
    const { error, data } = await event.locals.supabase.from('posts').select('created_at').eq("author_id", author_id)

    if (error) {
        return { type: "db_error", message: "Something went wrong on the server" }
    }

    const counts: Record<string, number> = {}
    for (const post of data) {
        const date = new Date(post.created_at)
        const key = new Date(date.getFullYear(), date.getMonth(), 1).toISOString()

        counts[key] = (counts[key] ?? 0) + 1
    }

    const result = Object.entries(counts).map(([date, value]) => ({
        date: new Date(date),
        value
    }))

    return { type: "success", data: result }
}