import { getRequestEvent, query } from "$app/server";
import * as v from 'valibot';

export const getPostBySlug = query(v.string(), async (viewSlug) => {
    const event = getRequestEvent()
    const user_id = event.locals.user.user_id
    const { data, error } = await event.locals.supabase.
        from('posts').
        select().eq('slug', viewSlug).
        single()

    if (data.author_id !== user_id && data.is_public != true) {
        return { type: "unauthorized", message: "Unauthorized" }
    }

    if (error) return { type: "db_error", message: "Something went wrong. Try again" }

    return { type: "success", post: data }
})


export const getPostByUser = query(v.string(), async (id) => {
    const event = getRequestEvent()
    const user_id = event.locals.user.id
    console.log("This is the userid", (user_id))
    console.log("this is the id from page:", id)
    if (id !== user_id) {
        return { type: "unauthorized", message: "Unauthorized" }
    }
    const { data, error } = await event.locals.supabase.from('posts').select().eq('author_id', user_id)

    if (error) return { type: "db_error", message: "Something went wrong. Try again" }
    console.log("Succes")
    return { type: "success", post: data }


})