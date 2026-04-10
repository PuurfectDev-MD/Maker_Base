import { getRequestEvent } from '$app/server'
import { redirect } from '@sveltejs/kit'


export async function load({ locals }) {
    if (!locals.user?.id) {
        redirect(303, "/auth/signup")
    }

    const resultForPost = await getPostCountPerMonth(locals.user.id)
    const postPerDayData = await getPostPerDay(locals.user.id)

    return {
        user: locals.user,
        postsPerMonth: resultForPost.type == "success" ? resultForPost.data : {},
        postsPerDay: postPerDayData?.type == "success" ? postPerDayData?.PostData : {}

    }
}


async function getPostCountPerMonth(author_id: string) {  // this is for the user line graph
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
        const dateStr = post.created_at as string
        const [year, month] = dateStr.split('-')
        const key = `${year}-${month}`
        counts[key] = (counts[key] ?? 0) + 1
    }
    const result = Object.entries(counts).map(([key, value]) => ({
        date: new Date(key),
        value
    }))

    return { type: "success", data: result }
}

async function getPostPerDay(author_id: string) { // this is for the user calendar chart
    const event = getRequestEvent()
    const user = event.locals.user.id

    if (author_id !== user) {
        return
    }

    const countsByDate = new Map<string, number>()

    const { data, error } = await event.locals.supabase.from("posts").select("created_at").eq("author_id", author_id)

    if (error) {
        return { type: "db_error", message: "There was an issue fetching your posts data" }
    }

    for (const post of data ?? []) {
        const dateStr = (post.created_at as string).split("T")[0]  // "2026-04-05"
        countsByDate.set(dateStr, (countsByDate.get(dateStr) ?? 0) + 1)
    }

    const calenderData = Array.from(countsByDate.entries()).map(([dateStr, count]) => ({
        date: new Date(dateStr + "T00:00:00"),  // midnight, no timezone shift
        value: count
    }))

    return { type: "success", PostData: calenderData }
}