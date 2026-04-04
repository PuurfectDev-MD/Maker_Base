import { command, form, getRequestEvent, query } from "$app/server";
import { supabase } from "$lib/supabase";
import * as v from 'valibot';

export const getPostBySlug = query(v.string(), async (viewSlug) => {
    const event = getRequestEvent()
    const user_id = event.locals.user.id
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
    if (id !== user_id) {
        return { type: "unauthorized", message: "Unauthorized" }
    }
    const { data, error } = await event.locals.supabase.from('posts').select().eq('author_id', user_id)

    if (error) return { type: "db_error", message: "Something went wrong. Try again" }
    console.log("Succes")
    return { type: "success", post: data }


})

export const getCommentByPost = query(v.string(), async (postSlug) => {
    const { data, error } = await supabase.from('comments').select().eq('post_slug', postSlug)

    if (error) return { type: "db_error", message: "Something went wrong. Try again" }
    return { type: "success", Postcomment: data }
})

export const createComment = form(v.object({
    content: v.pipe(v.string(), v.nonEmpty()),
    postSlug: v.pipe(v.string(), v.nonEmpty()),
    userName: v.pipe(v.string(), v.nonEmpty())
}), async ({ content, postSlug, userName }) => {
    const event = getRequestEvent()
    const user = event.locals.user

    console.log("calling db")

    const { error } = await event.locals.supabase.from('comments').insert({
        user_id: user.id,
        post_slug: postSlug,
        comment: content,
        user_name: userName
    })


    if (error) {
        return { type: "db_error", message: "Unable to send it to the world :(" }
    }

    return { type: "success", message: "Comment posted" }
}
)


export const getDots = query(v.string(), async (postSlug) => {
    const { data, error } = await supabase.from("posts").select("dots_count").eq("slug", postSlug).single()

    if (error) {
        console.log(error.message)
        return { type: "db_error", message: "There was an error fetching dots" }
    }

    return { dotsCount: data.dots_count }
})


export const addDots = command(v.string(), async (postSlug) => {
    const event = getRequestEvent()
    const user = event.locals.user.id

    if (!user) {
        return { type: "unauthorized", message: "You can send dots without signing in" }
    }

    const { data, error } = await event.locals.supabase.rpc("add_dot", { p_slug: postSlug, p_user_id: user })

    if (error) {
        return { type: "db_error", message: "Cannot send dots right now" }
    }
    if (data == "already_dotted") {
        return { type: "already_dotted", message: "You have already sent your dot." }
    }

    if (data == "success") {
        return { type: "success", message: "Dots sent!" }
    }
}
)
