import { query } from "$app/server";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";
import * as v from 'valibot'
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)


export const getUserDash = query((v.string()), async (id) => {
    //getting the user recent post
    const postsPromise = supabase.from("posts").select().limit(3).order("created_at", { ascending: false }).eq("author_id", id)

    //getting user post count
    const countPromise = supabase.from("posts").select("*", { count: "exact", head: true }).eq("author_id", id)

    const [postsResult, countResult] = await Promise.all([postsPromise, countPromise]);

    if (postsResult.error || countResult.error) {
        console.log(postsResult.error)
        console.log(countResult.error)
        return { type: "db_error", message: "There was an error fetching user data" }
    }

    return {
        type: 'success',
        posts: postsResult.data,
        totalCount: countResult.count
    }
})


export const getPostCountPerMonth = query((v.string()), async (id) => {

    const { error, data } = await supabase.from('posts').select('created_at').eq("author_id", id)

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

    return { type: "success", postMCounts: result }
})


export const getPostCountPerDay = query(v.string(), async (id) => {
    const countsByDate = new Map<string, number>()

    const { data, error } = await supabase.from("posts").select("created_at").eq("author_id", id)

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

    return { type: "success", PostDCounts: calenderData }

})