export async function load({ locals }) {
    const postPerMonthPromise = getPostCountPerMonth(locals.user.id, locals)
    const postPerDayPromise = getPostPerDay(locals.user.id, locals)
    return { postsPerMonth: postPerMonthPromise, postsPerDay: postPerDayPromise }
}

async function getPostCountPerMonth(author_id: string, locals: App.Locals) {  // this is for the user line graph

    const { error, data } = await locals.supabase.from('posts').select('created_at').eq("author_id", author_id)

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

async function getPostPerDay(author_id: string, locals: App.Locals) { // this is for the user calendar chart

    const countsByDate = new Map<string, number>()

    const { data, error } = await locals.supabase.from("posts").select("created_at").eq("author_id", author_id)

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

