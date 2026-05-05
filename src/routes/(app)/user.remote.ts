import { form, getRequestEvent, query } from "$app/server";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";
import * as v from 'valibot'
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export const getUserDash = query((v.string()), async (id) => {

    const event = getRequestEvent()
    const db = event.locals.supabase
    //getting the user recent post
    const postsPromise = db.from("posts").select().limit(3).order("created_at", { ascending: false }).eq("author_id", id)

    //getting user post count
    const countPromise = db.from("posts").select("*", { count: "exact", head: true }).eq("author_id", id)
    const recentTagsPromise = event.locals.supabase.from("tags").select("name, created_at").eq("author_id", id).limit(4).order("created_at", { ascending: false })
    const dotsCountPromise = event.locals.supabase.from("dots").select("*", { count: "exact", head: true }).eq("user_id", id)
    const streakPromise = event.locals.supabase.from("streak").select("current_streak").eq("user_id", id).maybeSingle()

    const [postsResult, countResult, recentTagsResult, dotsCountResult, streakPromiseResult] = await Promise.all([postsPromise, countPromise, recentTagsPromise, dotsCountPromise, streakPromise]);

    if (postsResult.error || countResult.error || recentTagsResult.error || dotsCountResult.error || streakPromiseResult.error) {
        console.log(postsResult.error)
        console.log(countResult.error)
        console.log(recentTagsResult.error)
        console.log(dotsCountResult.error)
        console.log(streakPromiseResult.error)
        return { type: "db_error", message: "There was an error fetching user data" }
    }

    if (streakPromiseResult.data == null) {
        const { error: streakRowInsert } = await event.locals.supabase.from("streak").insert({
            user_id: id
        })
        if (streakRowInsert) {
            console.log(streakRowInsert)
            return { type: "db_error", message: "There was an error creating streak row" }
        }

    }

    return {
        type: 'success',
        posts: postsResult.data,
        totalCount: countResult.count,
        recentTags: recentTagsResult.data,
        dotsCount: dotsCountResult.count,
        streakCount: streakPromiseResult.data?.current_streak ?? 0
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



export const addNewTag = form(v.object({
    name: v.pipe(v.string(), v.nonEmpty()),
}), async ({ name }) => {
    const event = getRequestEvent()
    const user = event.locals.user.id
    const { error } = await event.locals.supabase.from('tags').insert({
        name,
        author_id: user
    })

    if (error) {
        console.log(error.message)
        return { type: "db_error", message: "There was an issue uploading your tag" }
    }
    return { type: "success", message: "Your tag is saved!" }
})



export const deleteTag = query(v.string(), async (id) => {
    let event = getRequestEvent()

    const { error } = await event.locals.supabase.from("tags").delete().eq("id", id)

    if (error) {
        return { type: "db_error", message: "There was an error deleting tags" }
    }
    return { type: "success", message: "delted succesfully." }
})

export const getUserTags = query(v.string(), async (id) => {
    const event = getRequestEvent()

    const recentTags = event.locals.supabase.from("tags").select("name, created_at,id").eq("author_id", id).limit(4).order("created_at", { ascending: false })
    const allTags = event.locals.supabase.from("tags").select("name, created_at,id").eq("author_id", id).order("created_at", { ascending: true })

    const [recentTagRes, allTagsRes] = await Promise.all([recentTags, allTags])

    if (recentTagRes.error || allTagsRes.error) {
        console.error("Recent Tags Error:", recentTagRes.error?.message)
        console.error("All Tags Error:", allTagsRes.error?.message)
        return {
            type: "db_error", message: "there was an error fetching tag info", recent: [],
            all: [],
        }
    }

    return {
        recent: recentTagRes.data,
        all: allTagsRes.data
    }
})
